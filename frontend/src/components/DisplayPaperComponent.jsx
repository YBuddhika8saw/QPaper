import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";


export default function DisplayPaperComponent() {
  const subject = new URLSearchParams(window.location.search).get("subject");
    const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getQuestions?subject=${subject}`)
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subject]);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="genarateQuestionMain">
        <h1>{subject} Papers</h1>
        <table style={{ width: "100%" }}>
          {questions.map((question, index) => {
            return (
              <div
                className="questionBox"
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <td style={{ width: "80%" }}>
                  <h6>{`${index + 1}. ${question.question_text}`}</h6>
                </td>
                <td style={{ width: "10%" }}>
                  <Button variant="primary" >
                    View
                  </Button>
                </td>
              </div>
            );
          })}
        </table>
        
      </div>
    </div>
  );
}
