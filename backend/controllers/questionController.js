import asyncHandler from "express-async-handler";
import { addQuestion as addQuestionToModel } from "../models/questionModel.js";
import { getSubjects as getSubjectsFromModel } from "../models/questionModel.js";
import { getQuestions as getQuestionsFromModel } from "../models/questionModel.js";
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

//Upload image file
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

//get subjects in database question table
const getSubjectList = asyncHandler(async (req, res) => {
    const subjects = await getSubjectsFromModel()
    if (subjects) {
      res.status(200).json({
        subjects
      })
    } else {
      res.status(400).json({
        message: 'Invalid verification token or token expired',
      })
    }
  });


  //get all questions in database question table filtered by subject
  const getQuestions = asyncHandler(async (req, res) => {
    const subject = req.body.subject;
    const questions = await getQuestionsFromModel(subject)
    if (questions) {
      res.status(200).json({
        questions
      })
    } else {
      res.status(400).json({
        message: 'Invalid verification token or token expired',
      })
    }
  });




export { addQuestion,addImg,getSubjectList,getQuestions};
