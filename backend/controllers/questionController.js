import asyncHandler from "express-async-handler";
import { addQuestion as addQuestionToModel } from "../models/questionModel.js";
import expressFileUpload from 'express-fileupload';
import multer from "multer";
import path from 'path';




const addQuestion = asyncHandler(async (req, res) => {
    // Check if req.body exists before destructure
    if (!req.body) {
        res.status(400).send("Bad request: Request body is missing.");
        return;
    }

    const {
        qText,
        qTime,
        qType,
        qSubject,
        qSubjectArea,
        qDifficulty,
        qSpace,
        qMarks,
        qImage
    } = req.body.formData;

    

   

    const question = await addQuestionToModel(
        qText,
        qTime,
        qType,
        qSubject,
        qSubjectArea,
        qDifficulty,
        qSpace,
        qMarks,
        qImage
    );

    if (question) {
        res.status(201).json({
            'key': 'success',
        });
        console.log("Question added successfully");
    } else {
        res.status(400);
        throw new Error("Invalid question data");
    }
});



// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Public
const addImg = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error('No file uploaded');
  }
  res.status(200).json({
    filename: file.filename,
    path: path.join('frontend/src/assets/images/uploads', file.filename),
  });
});




export { addQuestion,addImg };
