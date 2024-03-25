import {query} from "../config/db.js";
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


export {getSubjectsInfo};