const stockMoveSchema = new Schema({
    operation_id: {
        type: Schema.Types.ObjectId,
        ref: 'StockOperation', // Connects this line to the header document
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // The specific item moving
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['DRAFT', 'DONE'],
        default: 'DRAFT'
    }
});

const StockMove = mongoose.model('StockMove', stockMoveSchema);
export default StockMove;