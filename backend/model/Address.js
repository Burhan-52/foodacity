import mongoose from "mongoose";

const address = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model("address", address);

