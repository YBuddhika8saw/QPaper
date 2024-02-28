import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GenQuestionComponent from "../components/GenQuestionComponent";


export default function GenaratedPaper() {
  

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="genarateQuestionMain">
       <GenQuestionComponent /> 
      </div>
    </div>
  );
}
