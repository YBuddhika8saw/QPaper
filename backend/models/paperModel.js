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
const addPaper = async (pName, pSubject, pExam) => {
    const subjectUpperCase = pSubject.toUpperCase();
  
    const addPaperQuery = `
      INSERT INTO paper (paper_name, subject, exam_name)
      VALUES (?, ?, ?);`;
    try {
      const result = await query(addPaperQuery, [
        pName,
        subjectUpperCase,
        pExam
      ]);
  
      const lastInsertIdResult = await query("SELECT LAST_INSERT_ID() AS paper_id");
      const paperId = lastInsertIdResult[0].paper_id;
  
      return paperId;
    } catch (error) {
      console.error("Error executing database query:", error);
      throw new Error("Failed to add paper to database");
    }
  };
  
//add paper questions to paper_questions table
const addPaperQuestions = async (paperId, questionIds) => {
    console.log("paperId", paperId);
    console.log("questionIds", questionIds);

    const addPaperQuestionQuery = `
      INSERT INTO paper_questions (paper_id, question_id)
      VALUES (?, ?);`;

    try {
        for (const questionId of questionIds) {
            await query(addPaperQuestionQuery, [paperId, questionId]);
        }
        return true; // Return true after successfully inserting all records
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to paper");
    }
};




export { getSubjectsInfo, addPaper, addPaperQuestions };