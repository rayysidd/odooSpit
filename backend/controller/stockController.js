import StockOperation from "../models/StockOperation.js";
import StockMove from "../models/StockMove.js";
import StockQuant from "../models/StockQuant.js";
import mongoose from "mongoose";

// @desc    Create a new stock operation (Draft)
// @route   POST /api/stock/operations
export const createOperation = async (req, res) => {
    try {
        const { 
            reference, 
            type, 
            source_location_id, 
            dest_location_id, 
            items // Array of { product_id, quantity }
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided for operation" });
        }

        // 1. Create the Operation Header
        const operation = new StockOperation({
            reference,
            type,
            source_location_id,
            dest_location_id,
            status: 'DRAFT',
            created_by: req.user._id
        });
        const savedOp = await operation.save();

        // 2. Create Stock Moves for each item
        const moves = items.map(item => ({
            operation_id: savedOp._id,
            product_id: item.product_id,
            quantity: item.quantity,
            state: 'DRAFT'
        }));

        await StockMove.insertMany(moves);

        res.status(201).json({ message: "Operation created", operation: savedOp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get operations with filters
// @route   GET /api/stock/operations
export const getOperations = async (req, res) => {
    try {
        const { type, status } = req.query;
        let filter = {};
        
        if (type) filter.type = type.toUpperCase();
        if (status) filter.status = status.toUpperCase();

        const operations = await StockOperation.find(filter)
            .populate('source_location_id', 'name')
            .populate('dest_location_id', 'name')
            .populate('created_by', 'name')
            .sort({ createdAt: -1 });

        res.json(operations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single operation details with moves
// @route   GET /api/stock/operations/:id
export const getOperationById = async (req, res) => {
    try {
        const operation = await StockOperation.findById(req.params.id)
            .populate('source_location_id')
            .populate('dest_location_id')
            .populate('created_by', 'name');

        if (!operation) return res.status(404).json({ message: "Operation not found" });

        const moves = await StockMove.find({ operation_id: operation._id })
            .populate('product_id', 'name sku uom');

        res.json({ ...operation.toObject(), moves });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Validate Operation (Execute Stock Move)
// @route   PUT /api/stock/operations/:id/validate
export const validateOperation = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const operation = await StockOperation.findById(req.params.id).session(session);
        
        if (!operation) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Operation not found" });
        }

        if (operation.status === 'DONE') {
            await session.abortTransaction();
            return res.status(400).json({ message: "Operation is already validated" });
        }

        // Fetch all moves associated with this operation
        const moves = await StockMove.find({ operation_id: operation._id }).session(session);

        // FIX: Removed typo 'ZS' below (was forZS)
        for (const move of moves) {
            // 1. DECREMENT Source Location
            await StockQuant.findOneAndUpdate(
                { product_id: move.product_id, location_id: operation.source_location_id },
                { $inc: { quantity: -move.quantity } },
                { upsert: true, new: true, session }
            );

            // 2. INCREMENT Destination Location
            await StockQuant.findOneAndUpdate(
                { product_id: move.product_id, location_id: operation.dest_location_id },
                { $inc: { quantity: move.quantity } },
                { upsert: true, new: true, session }
            );

            // 3. Mark Move as DONE
            move.state = 'DONE';
            await move.save({ session });
        }

        // Update Operation Status
        operation.status = 'DONE';
        operation.validated_at = new Date();
        await operation.save({ session });

        await session.commitTransaction();
        res.json({ message: "Operation validated and stock updated", operation });

    } catch (error) {
        await session.abortTransaction();
        console.error("Validation Error", error);
        res.status(500).json({ message: "Validation failed: " + error.message });
    } finally {
        session.endSession();
    }
};