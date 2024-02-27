import express from "express";
import upload from '../middleware/uploader.js';
const router = express.Router();
import { addQuestion,addImg,getSubjectList } from "../controllers/questionController.js";


// Route to handle adding a question
router.post('/addQuestion', addQuestion);

// Route to handle adding question image
router.post('/addImg', upload.single('image'), addImg);

//Route to get subjects in database
router.get('/getSubjects', getSubjectList);

export default router;

