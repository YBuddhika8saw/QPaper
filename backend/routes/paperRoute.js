import express from "express";
const router = express.Router();

import { getSubjectsInfo,addPaper } from "../controllers/paperController.js";

// Route to get subjects info
router.get('/getSubjectsInfo', getSubjectsInfo);

// Route to add a paper
router.post('/addPaper', addPaper);



export default router;