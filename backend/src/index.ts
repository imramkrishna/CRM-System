import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import profileRouter from "./routes/profileRoutes";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/auth", authRouter)
app.use("/profile", profileRouter);

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Backend Server is Running");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
