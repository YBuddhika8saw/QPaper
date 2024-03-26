import asyncHandler from "express-async-handler";

import { getSubjectsInfo as getSubjectsInfoFromModel } from "../models/paperModel.js";
import { addPaper as addPaperToModel } from "../models/paperModel.js";
import{addPaperQuestions as addPaperQuestionToModel} from "../models/paperModel.js";
import {getPaperBySubject as getPaperBySubjectFromModel} from "../models/paperModel.js";
import{getQuestionIdsByPaperId as getQuestionIdsByPaperIdFromModel} from "../models/paperModel.js";



//get Subjects Info
const getSubjectsInfo = asyncHandler(async (req, res) => {
  const subjectInfo = await getSubjectsInfoFromModel()
  res.status(200).json({
    subjectInfo
  })
});


//add Paper
const addPaper = async (paperName, paperSubject, paperExam) => {
  const paperId = await addPaperToModel(paperName, paperSubject, paperExam);
  if (paperId) {
    return paperId;
  } else {
    return null; // or false, indicating failure
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
  console.log("paperId from conteoller", paperId);
  const result = await passPaperQuestionsToModel(paperId, selectedIds);


  if (result) {
    res.status(200).json({
      message: "Paper questions added successfully"
    });
  } else {
    res.status(500).json({
      message: "Failed to add paper questions"
    });
  }
 
});

const passPaperQuestionsToModel = async (paperId, selectedId) => {
  const result = await addPaperQuestionToModel(paperId, selectedId);
  return result;
}


// get Papers by subject
 const getPaperBySubject = asyncHandler(async (req, res) => {
  const { subject } = req.query;
  const paperBySubject = await getPaperBySubjectFromModel(subject);
  res.status(200).json({
    paperBySubject
  });
});

//get question ids by paper id
const getQuestionIdsByPaperId = asyncHandler(async (req,res) => {
  const {paperId} = req.query;
  const questionIds = await getQuestionIdsByPaperIdFromModel(paperId);
  res.status(200).json({
    questionIds
  });
});


export { getSubjectsInfo, addPaperQuestions,getPaperBySubject,getQuestionIdsByPaperId };