import asyncHandler from "express-async-handler";
import { addQuestion as addQuestionToModel } from "../models/questionModel.js";


const addQuestion = asyncHandler(async (req, res) => {
    // Check if req.body exists before destructure
    if (!req.body) {
        res.status(400).send("Bad request: Request body is missing.");
        return;
    }
// console.log('hello');
//     console.log(req.body);

    const {
        qText,
        qTime,
        qType,
        qSubject,
        qSubjectArea,
        qDifficulty,
        qSpace
    } = req.body;

    
    const question = await addQuestionToModel(
        qText,
        qTime,
        qType,
        qSubject,
        qSubjectArea,
        qDifficulty,
        qSpace
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
