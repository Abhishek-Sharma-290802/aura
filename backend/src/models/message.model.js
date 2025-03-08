import mongoose from "mongoose";

const messageSchema = new mongoose.Schema (
    {
        senderId: { type: String, required: true },     // Clerk User ID
        receiverId: { type: String, reuired: true },    // Clerk User ID
        content: { type: String, required: true }, 
    },
    { timestamps: true }     // createdAt, updatedAt
);


export const Message = mongoose.model("Message", messageSchema);