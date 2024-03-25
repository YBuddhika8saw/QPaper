import asyncHandler from "express-async-handler";
import path from 'path';

import{getSubjectsInfo as getSubjectsInfoFromModel} from "../models/paperModel.js";
import{addPaper as addPaperToModel} from "../models/paperModel.js";



  //get Subjects Info
  const getSubjectsInfo = asyncHandler(async (req, res) => {
    const subjectInfo = await getSubjectsInfoFromModel()
      res.status(200).json({
        subjectInfo
      })
  });
  

    //add Paper
    const addPaper = asyncHandler(async (req, res) => {
      const {pName,pSubject,pExam} = req.body;
      const paperId = await addPaperToModel(pName,pSubject,pExam)
      res.status(200).json({
        paperId
      })
    });

  export {getSubjectsInfo,addPaper};