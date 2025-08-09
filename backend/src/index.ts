import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import profileRouter from "./routes/profileRoutes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


// Routes
app.use("/auth", authRouter)
app.use("/profile", profileRouter);

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Backend Server is Running");
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
