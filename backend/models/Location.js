import mongoose from "mongoose";

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['INTERNAL', 'CUSTOMER', 'VENDOR', 'INVENTORY_LOSS'],
        required: true
    },
    max_capacity: {
        type: Number,
        default: 0, 
        required: false,
        min: 0 
    },
    parent_path: {
        type: String,
        index: true 
    }
});

const Location = mongoose.model('Location', locationSchema);
export default Location;