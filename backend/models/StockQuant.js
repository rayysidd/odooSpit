import mongoose from "mongoose";

const stockQuantSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', 
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
});

// Composite Unique Key on (product_id, location_id)
stockQuantSchema.index({ product_id: 1, location_id: 1 }, { unique: true });

const StockQuant = mongoose.model('StockQuant', stockQuantSchema);
export default StockQuant;