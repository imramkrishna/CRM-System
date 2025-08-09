import express from 'express';

const profileRouter = express.Router();

profileRouter.get("/dashboard", (req, res) => {
    // Handle dashboard retrieval
    res.send("User Dashboard");
})

export default profileRouter;