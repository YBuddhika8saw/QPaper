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
      console.log("result from model", result.insertId);
      const paperId = result.insertId;
  
      return paperId;
    } catch (error) {
      console.error("Error executing database query:", error);
      throw new Error("Failed to add paper to database");
    }
  };
  
//add paper questions to paper_questions table
const addPaperQuestions = async (paperId, questionIds) => {
    const addPaperQuestionQuery = `
      INSERT INTO paper_questions (paper_id, question_id)
      VALUES (?, ?);`;

      console.log("paperId from modal", paperId);

    try {
        const promises = questionIds.map(async(questionId) => {
            return await query(addPaperQuestionQuery, [paperId, questionId]);
        });
        await Promise.all(promises);
        return true;
    } catch (error) {
        console.error("Error executing database query:", error);
        throw new Error("Failed to add question to paper");
    }
};

//get papers by subject






export { getSubjectsInfo, addPaper, addPaperQuestions };