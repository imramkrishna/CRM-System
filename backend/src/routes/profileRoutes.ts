import express from 'express';

const profileRouter = express.Router();

profileRouter.get("/dashboard", (req, res) => {
    res.send("User Dashboard");
})

export default profileRouter;