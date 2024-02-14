import express from "express";
const router = express.Router();

// Define your routes
router.get("/hello", (req, res) => {
    res.send("Hello from questionRoutes!");
});

export default router;
