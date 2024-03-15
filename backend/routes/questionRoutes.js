import express from "express";
import upload from '../middleware/uploader.js';
const router = express.Router();
import { addQuestion,addImg,getSubjectList,getQuestions,getQuestionsById} from "../controllers/questionController.js";


// Route to handle adding a question
router.post('/addQuestion', addQuestion);

// Route to handle adding question image
router.post('/addImg', upload.single('image'), addImg);

//Route to get subjects in database
router.get('/getSubjects', getSubjectList);

//Route to get questions in database filtered by subject
router.get('/getQuestions', getQuestions);

//Route to get questions in database filtered by question id
router.get('/getQuestionsById', getQuestionsById);

export default router;

