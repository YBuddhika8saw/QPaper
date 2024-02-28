import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GenQuestionComponent() {
  // Retrieve the subject from the URL query parameters
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getQuestions?subject=${subject}`)
      .then((response) => {
        // console.log(response.data.eventFullDetails.eventDetails.eventdescription);
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subject]);

  // get frist 2 questions from the array
  const firstTwoQuestions = questions.slice(0, 2).map((value) => value);
  console.log(firstTwoQuestions);

  return (
    <div size="A4">
      {firstTwoQuestions.map((question, index) => {
        const ansHeight = question.space_allocated * 96; // Calculate height based on the space_allocated property of the question (1 Inch = 96px)

        return (
          <div className="questionBox" key={index}>
            <h5>{`${index + 1}. ${question.question_text}`}</h5>

            <div style={{ textAlign: "right" }}>{question.mark} marks</div>
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
  );
}
