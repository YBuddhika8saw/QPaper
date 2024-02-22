import asyncHandler from "express-async-handler";
import { addQuestion as addQuestionToModel } from "../models/questionModel.js";
import multer from "multer";




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




export { addQuestion };
