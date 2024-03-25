import asyncHandler from "express-async-handler";
import path from 'path';

import{getSubjectsInfo as getSubjectsInfoFromModel} from "../models/paperModel.js";



  //get Subjects Info
  const getSubjectsInfo = asyncHandler(async (req, res) => {
    const subjectInfo = await getSubjectsInfoFromModel()
      res.status(200).json({
        subjectInfo
      })
  });
  

  export {getSubjectsInfo};