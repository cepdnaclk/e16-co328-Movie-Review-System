import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: { 
        type: String, 
        required: true 
    },

    email: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },

    joinDate: {
        type: Date,
        default: new Date(),
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);