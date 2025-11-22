import Product from '../models/Product.js';
import StockQuant from '../models/StockQuant.js';
import Location from '../models/Location.js';
import StockOperation from '../models/StockOperation.js';
import mongoose from 'mongoose';

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

export const getDashboardKPIs = async (req, res) => {
    try {
        // --- 1. Total Products in Stock (FIXED: Internal Locations Only) ---
        const totalStockResult = await StockQuant.aggregate([
            // A. Join with Location to check the type
            {
                $lookup: {
                    from: 'locations',
                    localField: 'location_id',
                    foreignField: '_id',
                    as: 'location'
                }
            },
            { $unwind: '$location' },
            // B. Filter: Only count stock residing in INTERNAL locations
            { $match: { 'location.type': 'INTERNAL' } },
            // C. Sum the quantities
            { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } }
        ]);
        const totalProductsInStock = totalStockResult[0]?.totalQuantity || 0;


        // --- 2. Low Stock / Out of Stock (FIXED: Internal Locations Only) ---
        const lowStockCountResult = await StockQuant.aggregate([
            // A. Join with Location
            {
                $lookup: {
                    from: 'locations',
                    localField: 'location_id',
                    foreignField: '_id',
                    as: 'location'
                }
            },
            { $unwind: '$location' },
            // B. Filter: Internal Only
            { $match: { 'location.type': 'INTERNAL' } },
            
            // C. Group by Product (Summing stock across all internal warehouses)
            { $group: { _id: '$product_id', totalQuantity: { $sum: '$quantity' } } },

            // D. Join with Product to get min_stock_level
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: '$productDetails' },

            // E. Compare
            {
                $match: {
                    $expr: { $lt: ['$totalQuantity', '$productDetails.min_stock_level'] }
                }
            },
            { $count: 'lowStockCount' }
        ]);
        const lowStockCount = lowStockCountResult[0]?.lowStockCount || 0;

        
        // --- 3. Pending Operations (Unchanged) ---
        const pendingOpsResult = await StockOperation.aggregate([
            { $match: { status: { $in: ['WAITING', 'READY'] } } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        const pendingKPIs = pendingOpsResult.reduce((acc, item) => {
            acc[item._id.toLowerCase()] = item.count;
            return acc;
        }, { receipt: 0, delivery: 0, internal: 0, adjustment: 0 });


        // --- 4. Warehouse Occupancy (Unchanged) ---
        const warehouseId = req.query.warehouseId ? toObjectId(req.query.warehouseId) : null;
        let occupancyData = {};

        if (warehouseId) {
            const occupancyResult = await StockQuant.aggregate([
                { $match: { location_id: warehouseId } },
                { $group: { _id: '$location_id', currentStock: { $sum: '$quantity' } } },
                {
                    $lookup: {
                        from: 'locations',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'locationDetails'
                    }
                },
                { $unwind: '$locationDetails' },
                {
                    $project: {
                        currentStock: 1,
                        maxCapacity: '$locationDetails.max_capacity',
                        occupancyPercent: {
                            $cond: { 
                                if: { $gt: ['$locationDetails.max_capacity', 0] },
                                then: { $multiply: [{ $divide: ['$currentStock', '$locationDetails.max_capacity'] }, 100] },
                                else: 0
                            }
                        }
                    }
                }
            ]);
            occupancyData = occupancyResult[0] || { currentStock: 0, maxCapacity: 0, occupancyPercent: 0 };
        }
        
        res.status(200).json({
            totalProductsInStock,
            lowStockCount,
            pendingReceipts: pendingKPIs.receipt,
            pendingDeliveries: pendingKPIs.delivery,
            internalTransfersScheduled: pendingKPIs.internal,
            warehouseOccupancy: occupancyData
        });

    } catch (error) {
        console.error('Dashboard KPI Error:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data.' });
    }
};