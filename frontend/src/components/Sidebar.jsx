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
            <Link to="/adminDashboard">
              <span className="iconSize">
                <BsFillGridFill size={25} />
              </span>
              Dashboard
            </Link>
            <Link to="/Users">
              <span className="iconSize">
                <HiOutlineUsers size={25} />
              </span>
              #
            </Link>
            <Link to="/TicketSupports">
              <span className="iconSize">
                <GoStack size={25} />
              </span>
              #
            </Link>
            <Link to="/Revenue">
              <span className="iconSize">
                <BiDollar size={25} />
              </span>
              #
            </Link>
            <Link to="/AdminEvents">
              <span className="iconSize">
                <BiHomeAlt2 size={25} />
              </span>
              #
            </Link>          
            </div>
        </div>

  )
}
