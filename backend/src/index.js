import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import fileeUpload from "express-fileupload";
import path from "path";
import cors from "cors";

dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true}
));  //for cross-origin requests

app.use(express.json());    //to parse req.body
app.use(clerkMiddleware());     // this will add auth to req obj => req.auth
app.use(fileeUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 100 * 1024 * 1024 } // 10MB max fileSize
})); 

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/song", songRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/stat", statRoutes);

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message });
});

app.listen(PORT, () => {
    console.log("Server is running on port" + PORT);
    connectDB();
})

// todo: socoket.io