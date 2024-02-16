import express from "express";
const router = express.Router();
import { addQuestion } from "../controllers/questionController.js";


// Route to handle adding a question
router.post('/addQuestion', addQuestion);

export default router;
