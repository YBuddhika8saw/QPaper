import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const[subjectInfo,setSubjectInfo]=useState([]);
  const[questionCount,setQuestionCount]=useState([]);
  const[paperCount,setPaperCount]=useState([]);
  const[totalSubjectsCount,setTotalSubjectsCount]=useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getTotalQuestions`)
      .then((response) => {

        setQuestionCount(response?.data?.questionsCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getTotalSubjects`)
      .then((response) => {

        setTotalSubjectsCount(response?.data?.subjectCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getTotalPapers`)
      .then((response) => {

        setPaperCount(response?.data?.paperCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/paper/getSubjectsInfo`)
      .then((response) => {

        setSubjectInfo(response?.data?.subjectInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  return (
    <div>
      <Navbar />
      {/* import sidebar from '../components/Sidebar' */}
      <Sidebar />
      <div className="main">
      <div className="topRow">
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Subjects
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {totalSubjectsCount}
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Questions
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {questionCount}
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Papers
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        {paperCount}
      </Card.Text>
    </Card.Body>
  </Card>
</div>

<div class="bottomRow">
  <table class="dashboardTable">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Questions</th>
        <th>Papers</th>
      </tr>
    </thead>
    <tbody>
      {subjectInfo.map((subject) => (
        <tr key={subject.subject}>
         <td>{subject.subject}</td>
         <td><Link to={`/QuestionBank/Questions?subject=${subject.subject}`}> {subject.total_questions}</Link></td>
          <td>{subject.total_papers}</td>  
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}
