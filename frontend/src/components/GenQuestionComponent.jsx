import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function GenQuestionComponent() {
  // Retrieve the subject from the URL query parameters
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Create a reference to the PDF component
  const options = {
    filename: 'questionpaper.pdf',
    orientation: 'portrait', 
    unit: 'in', 
    format: 'a4',
  };
    const { toPDF, targetRef } = usePDF(options);

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

  // get frist 2 questions from the array
  const firstTwoQuestions = questions.slice(0, 2).map((value) => value);

  const handleClick = (event) => {
    event.preventDefault();
    // Redirect to another page with the subject included as a query parameter
    navigate(
      `/QuestionBank/Questions?subject=${encodeURIComponent(subject)}&id=${encodeURIComponent('hell0')}`
    );
  };

  return (
    
    <div size="A4">
      {/* create the PDF component  */}
      <div ref={targetRef}>
      {firstTwoQuestions.map((question, index) => {
        const ansHeight = question.space_allocated * 96; // Calculate height based on the space_allocated property of the question (1 Inch = 96px)

        return (
          <div className="questionBox" key={index}>
            <span style={{fontSize:'18px'}} >{`${index + 1}. ${question.question_text}`} </span>
            <div style={{ textAlign: "right" }}>{question.mark} marks</div>
            <img src={`${question.image_name}`} alt="" />

            <div
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                height: `${ansHeight}px`, // Set the height dynamically based on the calculated height
              }}
            >
              <div style={{ fontSize: "10px" }}>
                <b>ANSWER IN THIS BOX</b>
              </div>
            </div>
          </div>
        );
      })}
        </div>
        <Button as="input" type="submit" onClick={() => toPDF()} value="Download PDF" />{' '}
        <Button onClick={handleClick}> Select Questions </Button>
    </div>
    
  );
}
