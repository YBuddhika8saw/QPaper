import express from "express";
import upload from '../middleware/uploader.js';
const router = express.Router();
import { addQuestion,addImg } from "../controllers/questionController.js";


// Route to handle adding a question
router.post('/addQuestion', addQuestion);

// Route to handle adding question image
router.post('/addImg', upload.single('image'), addImg);

export default router;

