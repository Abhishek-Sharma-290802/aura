import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    clerkId: {
        type: String,
        reuired: true,
        unique: true
    },
}, 
{ timestamps: true }    // createdAt, updatedAt
);


export const User = mongoose.model("User", userSchema);