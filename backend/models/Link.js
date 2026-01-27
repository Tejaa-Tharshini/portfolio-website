import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);
