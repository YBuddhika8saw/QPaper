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
    // Convert qSubject and qSubjectArea to uppercase
    const subjectUpperCase = qSubject.toUpperCase();
    const subjectAreaUpperCase = qSubjectArea.toUpperCase();

    const addQuestionQuery = `
        INSERT INTO questions (question_text, expected_time, question_type, subject, difficulty_level, subject_area, space_allocated,mark,image_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    try {
        const result = await query(addQuestionQuery, [
            qText,
            qTime,
            qType,
            subjectUpperCase, // Use the uppercase version
            qDifficulty,
            subjectAreaUpperCase, // Use the uppercase version
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
    const getSubjectsQuery = `SELECT DISTINCT subject FROM questions`;
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

//get questions in database question table filtered by question id
const getQuestionById = asyncHandler(async (questionId) =>  {
    const getQuestionByIdQuery = `SELECT * FROM questions WHERE question_id = ?`;
    try {        
        const result = await query(getQuestionByIdQuery,[questionId]);
        return result;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get question from database");
    } 
});


// Function to get total question count from database
const getTotalQuestionCount = asyncHandler(async () => {
    const getTotalQuestionCountQuery = `SELECT COUNT(*) AS total_questions FROM questions`;
    try {
        const result = await query(getTotalQuestionCountQuery);
        return result[0].total_questions;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get total question count from database");
    }
});

// Function to get total distinct subjects count from database
const getTotalDistinctSubjectsCount = asyncHandler(async () => {
    const getTotalDistinctSubjectsCountQuery = `SELECT COUNT(DISTINCT subject) AS total_distinct_subjects FROM questions`;
    try {
        const result = await query(getTotalDistinctSubjectsCountQuery);
        return result[0].total_distinct_subjects;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get total distinct subjects count from database");
    }
});


// Function to get total paper count from database
const getTotalPaperCount = asyncHandler(async () => {
    const getTotalPaperCountQuery = `SELECT COUNT(*) AS total_papers FROM paper`;
    try {
        const result = await query(getTotalPaperCountQuery);
        return result[0].total_papers;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get total paper count from database");
    }
});


export { addQuestion, getSubjects,getQuestions,getQuestionById,getTotalQuestionCount,getTotalDistinctSubjectsCount,getTotalPaperCount};
