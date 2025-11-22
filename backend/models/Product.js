import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    uom: {
        type: String,
        default: 'Unit',
        trim: true
    },
    min_stock_level: {
        type: Number,
        default: 0
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;