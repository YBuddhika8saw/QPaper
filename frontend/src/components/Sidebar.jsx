import React from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { BiDollar } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";
import { GoStack } from "react-icons/go";
import { Link } from "react-router-dom";


// css file for the sidebar is in frontend/src/assets/css/sidebar.css

export default function Sidebar() {
  return (
    <div>
          <div class="sidebar">
            <Link to="/">
              <span className="iconSize">
                <BsFillGridFill size={25} />
              </span>
              Dashboard
            </Link>
            <Link to="#">
              <span className="iconSize">
                <BiHomeAlt2 size={25} />
              </span>
              Create a Paper
            </Link>  
            <Link to="/AddQuestions">
              <span className="iconSize">
                <HiOutlineUsers size={25} />
              </span>
              Add Question
            </Link>
            <Link to="#">
              <span className="iconSize">
                <GoStack size={25} />
              </span>
              Question Bank
            </Link>
            <Link to="#">
              <span className="iconSize">
                <BiDollar size={25} />
              </span>
              Add Instruction
            </Link>
            <Link to="#">
              <span className="iconSize">
                <BiHomeAlt2 size={25} />
              </span>
              Instruction Bank
            </Link>                  
            </div>
        </div>

  )
}
