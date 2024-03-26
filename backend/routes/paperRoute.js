import express from "express";
const router = express.Router();

import { getSubjectsInfo,addPaperQuestions,getPaperBySubject } from "../controllers/paperController.js";

// Route to get subjects info
router.get('/getSubjectsInfo', getSubjectsInfo);

// Route to add a paper
router.post('/addPaper', addPaperQuestions);

// Route to get papers by subject
router.get('/getPaperBySubject', getPaperBySubject);




export default router;