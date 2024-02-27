// import {pool} from "../config/db.js";
import {query} from "../config/db.js";
import asyncHandler from 'express-async-handler';



// Add a question to the database
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
        const result = await query(addQuestionQuery, [
            qText,
            qTime,
            qType,
            qSubject,
            qDifficulty,
            qSubjectArea,
            qSpace,
            qMarks,
            qImage
        ])
        return true;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to database");
    }
});

//get subjects in database question table
const getSubjects = asyncHandler(async () =>  {
    const getSubjectsQuery = `SELECT DISTINCT subject FROM questions ORDER BY subject`;
    try {        
        const result = await query(getSubjectsQuery,[]);
        return result;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get subjects from database");
    } 
});


//get all questions in database question table filtered by subject
const getQuestions = asyncHandler(async (subject) =>  {
    const getQuestionsQuery = `SELECT * FROM questions WHERE subject = ?`;
    try {        
        const result = await query(getQuestionsQuery,[subject]);
        return result;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get questions from database");
    } 
});







export { addQuestion, getSubjects,getQuestions};
