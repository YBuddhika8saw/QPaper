import asyncHandler from "express-async-handler";
import { getSubjectsInfo as getSubjectsInfoFromModel } from "../models/paperModel.js";
import { addPaper as addPaperToModel } from "../models/paperModel.js";
import{addPaperQuestions as addPaperQuestionToModel} from "../models/paperModel.js";



//get Subjects Info
const getSubjectsInfo = asyncHandler(async (req, res) => {
  const subjectInfo = await getSubjectsInfoFromModel()
  res.status(200).json({
    subjectInfo
  })
});


//add Paper
const addPaper = (paperName, paperSubject, paperExam) =>{
  const paperId =  addPaperToModel(paperName, paperSubject, paperExam);
  if (paperId) {
    return paperId;
    }
  } 
  

//add paper questions to paper_questions table
const addPaperQuestions = asyncHandler( async (req,res) => {
  const {
    paperName,
    paperSubject,
    paperExam,
    selectedIds
  } = req.body.paperData;

  const paperId = await addPaper(paperName, paperSubject, paperExam);  
  const result = await passPaperQuestionsToModel(paperId, selectedIds);
  
  if (result) {
    res.status(200).json({
      message: 'Paper added successfully'
    })
  } else {
    res.status(400).json({
      message: 'Failed to add paper',
    })
  }

});

const passPaperQuestionsToModel = async (paperId, selectedId) => {
  const result = await addPaperQuestionToModel(paperId, selectedId);
  return result;
}




export { getSubjectsInfo, addPaperQuestions };