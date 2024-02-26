import pool from "../config/db.js";
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';

const addQuestion = asyncHandler(async (
    qText,
    qTime,
    qType,
    qSubject,
    qSubjectArea,
    qDifficulty,
    qSpace,
    qMarks,
    qImage
) => {
    const addQuestionQuery = `
        INSERT INTO questions (question_text, expected_time, question_type, subject, difficulty_level, subject_area, space_allocated,mark,image_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        

    try {
        const result = await pool.query(addQuestionQuery, [
            qText,
            qTime,
            qType,
            qSubject,
            qDifficulty,
            qSubjectArea,
            qSpace,
            qMarks,
            qImage
        ]);

        

        return true;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to database");
    }
});


export { addQuestion};
