const stockOperationSchema = new Schema({
    reference: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['RECEIPT', 'DELIVERY', 'INTERNAL', 'ADJUSTMENT'],
        required: true
    },
    source_location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    dest_location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    status: {
        type: String,
        enum: ['DRAFT', 'WAITING', 'READY', 'DONE', 'CANCELLED'],
        default: 'DRAFT',
        index: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    validated_at: {
        type: Date,
        nullable: true 
    }
}, { timestamps: true });

const StockOperation = mongoose.model('StockOperation', stockOperationSchema);
export default StockOperation;