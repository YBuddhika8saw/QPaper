import { query } from "../config/db.js";
import asyncHandler from 'express-async-handler';


// Function to get distinct subjects along with the number of questions and papers for each subject
const getSubjectsInfo = asyncHandler(async () => {
    const getSubjectsInfoQuery = `
        SELECT 
            subject,
            COUNT(*) AS total_questions,
            (SELECT COUNT(*) FROM paper WHERE paper.subject = questions.subject) AS total_papers
        FROM 
            questions
        GROUP BY 
            subject;
    `;
    try {
        const result = await query(getSubjectsInfoQuery);
        return result;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to get subjects info from database");
    }
});


// Add a paper to the database
const addPaper = asyncHandler(async (
    pName,
    pSubject,
    pExam
) => {
    // Convert qSubject and qSubjectArea to uppercase
    const subjectUpperCase = pSubject.toUpperCase();
    
    const addPaperQuery = `
    INSERT INTO paper (paper_name, subject, exam_name)
    VALUES (?, ?, ?);`;
    try {
        // Execute the INSERT query
        const result = await query(addPaperQuery, [
            pName,
            subjectUpperCase,
            pExam
        ]);
    
        // After the INSERT, execute the SELECT LAST_INSERT_ID() query
        const lastInsertIdResult = await query("SELECT LAST_INSERT_ID() AS paper_id");
    
        // Extract the paper_id from the result
        const paperId = lastInsertIdResult[0].paper_id;
    
        // Return the paper_id
        return paperId;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to database");
    }
    
});



export { getSubjectsInfo,addPaper };