import express from "express";
const router = express.Router();

import { getSubjectsInfo } from "../controllers/paperController.js";

// Route to get subjects info
router.get('/getSubjectsInfo', getSubjectsInfo);



export default router;