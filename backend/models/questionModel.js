import pool from "../config/db.js";
import asyncHandler from 'express-async-handler';

const addQuestion = asyncHandler(async (
    qText,
    qTime,
    qType,
    qSubject,
    qSubjectArea,
    qDifficulty,
    qSpace
) => {
    const addQuestionQuery = `
        INSERT INTO questions (question_text, expected_time, question_type, subject, difficulty_level, subject_area, space_allocated)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
        const result = await pool.query(addQuestionQuery, [
            qText,
            qTime,
            qType,
            qSubject,
            qDifficulty,
            qSubjectArea,
            qSpace
        ]);
        return true;
        // if (result && result.rows && result.rows.length > 0) {
        //     const insertedQuestion = result.rows[0];
        //     return insertedQuestion;
        // } else {
        //     throw new Error("No rows returned from database query");
        // }
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to database");
    }
});

export { addQuestion };
