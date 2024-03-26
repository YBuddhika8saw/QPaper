import React from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { GiNewspaper } from "react-icons/gi";
import { BsBank } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { Link } from "react-router-dom";


// css file for the sidebar is in frontend/src/assets/css/sidebar.css

export default function Sidebar() {
  return (
    <div>
          <div className="sidebar">
            <Link to="/">
              <span className="iconSize">
                <BsFillGridFill size={25} />
              </span>
              Dashboard
            </Link>
            <Link to="/CreatePaper">
              <span className="iconSize">
                <GiNewspaper size={25} />
              </span>
              Create a Paper
            </Link>  
            <Link to="/AddQuestions">
              <span className="iconSize">
                <BsFillQuestionSquareFill size={25} />
              </span>
              Add Question
            </Link>
            <Link to="/QuestionBank">
              <span className="iconSize">
                <BsBank size={25} />
              </span>
              Question Bank
            </Link>
            <Link to="#">
              <span className="iconSize">
                <MdOutlineIntegrationInstructions size={25} />
              </span>
              Add Instruction
            </Link>
            <Link to="#">
              <span className="iconSize">
                <BsBank2 size={25} />
              </span>
              Instruction Bank
            </Link>                  
            </div>
        </div>

  )
}
