const Product = require('../models/Product');
const StockQuant = require('../models/StockQuant');
const Location = require('../models/Location');
const StockOperation = require('../models/StockOperation');
const mongoose = require('mongoose');

// Helper function to convert Mongoose ID to string for aggregation
const toObjectId = (id) => new mongoose.Types.ObjectId(id);

/**
 * @desc Fetches all necessary KPIs for the StockMaster dashboard
 * @route GET /api/dashboard/kpis
 * @access Private (Manager/Staff role check assumed via middleware)
 */
exports.getDashboardKPIs = async (req, res) => {
    try {
        // --- 1. Total Products in Stock (KPI: Total Products in Stock) ---
        const totalStockResult = await StockQuant.aggregate([
            // Group and sum all quantities across the entire ledger
            { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } }
        ]);
        const totalProductsInStock = totalStockResult[0]?.totalQuantity || 0;


        // --- 2. Low Stock / Out of Stock Items Count (KPI: Low Stock / Out of Stock Items) ---
        const lowStockCountResult = await StockQuant.aggregate([
            // A. Group by product_id and sum quantity (Total Current Stock)
            { $group: { _id: '$product_id', totalQuantity: { $sum: '$quantity' } } },

            // B. Join with Products collection to get the min_stock_level
            {
                $lookup: {
                    from: 'products', // The name of the collection in MongoDB (usually pluralized)
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            // Unwind the productDetails array (since there's only one product match)
            { $unwind: '$productDetails' },

            // C. Filter where current stock is less than the minimum threshold
            {
                $match: {
                    $expr: { $lt: ['$totalQuantity', '$productDetails.min_stock_level'] }
                }
            },

            // D. Count the remaining documents (low stock products)
            { $count: 'lowStockCount' }
        ]);
        const lowStockCount = lowStockCountResult[0]?.lowStockCount || 0;

        
        // --- 3. Pending Operations (KPIs: Receipts, Deliveries, Transfers) ---
        // Fetch all pending statuses in one go
        const pendingOpsResult = await StockOperation.aggregate([
            { $match: { status: { $in: ['WAITING', 'READY'] } } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        // Map the results to a structured object
        const pendingKPIs = pendingOpsResult.reduce((acc, item) => {
            acc[item._id.toLowerCase()] = item.count;
            return acc;
        }, { receipt: 0, delivery: 0, internal: 0, adjustment: 0 });


        // --- 4. Warehouse Occupancy (New Feature Logic) ---
        // Requires a specific warehouse ID, passed as a query parameter (e.g., ?warehouseId=...)
        const warehouseId = req.query.warehouseId ? toObjectId(req.query.warehouseId) : null;
        let occupancyData = {};

        if (warehouseId) {
            const occupancyResult = await StockQuant.aggregate([
                // A. Filter StockQuants to the target warehouse
                { $match: { location_id: warehouseId } },

                // B. Sum quantities to get Current Occupancy
                { $group: { _id: '$location_id', currentStock: { $sum: '$quantity' } } },

                // C. Join with Location to get max_capacity
                {
                    $lookup: {
                        from: 'locations', // Collection name
                        localField: '_id',
                        foreignField: '_id',
                        as: 'locationDetails'
                    }
                },
                { $unwind: '$locationDetails' },

                // D. Calculate percentage
                {
                    $project: {
                        currentStock: 1,
                        maxCapacity: '$locationDetails.max_capacity',
                        occupancyPercent: {
                            $cond: { // Handle division by zero or capacity of 0
                                if: { $gt: ['$locationDetails.max_capacity', 0] },
                                then: {
                                    $multiply: [{ $divide: ['$currentStock', '$locationDetails.max_capacity'] }, 100]
                                },
                                else: 0
                            }
                        }
                    }
                }
            ]);
            // Take the first result or default to zero
            occupancyData = occupancyResult[0] || { currentStock: 0, maxCapacity: 0, occupancyPercent: 0 };
        }
        
        // --- FINAL RESPONSE ---
        res.status(200).json({
            totalProductsInStock: totalProductsInStock,
            lowStockCount: lowStockCount,
            pendingReceipts: pendingKPIs.receipt,
            pendingDeliveries: pendingKPIs.delivery,
            internalTransfersScheduled: pendingKPIs.internal,
            warehouseOccupancy: occupancyData // Frontend uses this to render the gauge
        });

    } catch (error) {
        console.error('Dashboard KPI Error:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data.' });
    }
};