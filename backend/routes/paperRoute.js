import express from "express";
const router = express.Router();

import { getSubjectsInfo,addPaperQuestions } from "../controllers/paperController.js";

// Route to get subjects info
router.get('/getSubjectsInfo', getSubjectsInfo);

// Route to add a paper
router.post('/addPaper', addPaperQuestions);



export default router;