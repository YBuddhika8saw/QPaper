import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function DisplayPaperComponent() {
  const subject = new URLSearchParams(window.location.search).get("subject");
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/paper/getPaperBySubject?subject=${subject}`
      )
      .then((response) => {
        setPapers(response.data.paperBySubject);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subject]);

  const handleIdChange = (paperId) => {
    try {
      axios
        .get(`http://localhost:5000/api/paper/getQuestionIdsByPaperId?paperId=${paperId}`)
        .then((response) => {
          const questionIdArray = response.data.questionIds.map((questionId) => {
            return questionId.question_id;
          });
  
          navigate(
            `/QuestionBank/GenaratedPaper?selectedIds=${encodeURIComponent(
              questionIdArray.join(",")
            )}&subject=${encodeURIComponent(subject)}&type=${encodeURIComponent('savedPaper')}`
          );
        });
    } catch (error) {
      console.error("Error in handleIdChange:", error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="genarateQuestionMain">
        <h1>{subject} Papers</h1>
        <br />
        <br />
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "60%" }}>
              <h3>Paper Name</h3>
            </td>
            <td style={{ width: "30%" }}>
              <h3>Exam Name</h3>
            </td>
            <td style={{ width: "10%" }}></td>
          </tr>
          {papers.map((singlePaper, index) => {
            return (
              <tr>
                <td style={{ width: "60%" }}>
                  <h6>{`${index + 1}. ${singlePaper.paper_name}`}</h6>
                </td>
                <td style={{ width: "30%" }}>{singlePaper.exam_name}</td>
                <td style={{ width: "10%" }}>
                  <Button
                    variant="primary"
                    onClick={() => handleIdChange(singlePaper.paper_id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
