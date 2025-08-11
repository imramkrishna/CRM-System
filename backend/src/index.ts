import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authRoutes";
import profileRouter from "./routes/auth/profileRoutes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/profile/adminRoutes";
import distributorRouter from "./routes/profile/distributorRoutes";
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
// Middleware
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3002", // for your local dev
    "https://harmony-surgi-tech.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log('CORS blocked origin:', origin);
                callback(null, true); // Allow all for now, change to callback(new Error('Not allowed by CORS')) later
            }
        },
        credentials: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
    })
);
// Routes
app.use("/auth", authRouter)
app.use("/profile", profileRouter);
app.use("/admin", adminRouter);
app.use("/distributor", distributorRouter);

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Backend Server is Running");
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
