import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SubjectQuestions() {

    
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");
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
        <h1>{subject} Questions</h1>
        {questions.map((question, index) => {
        return (
          <div className="questionBox" key={index}>
            <h5>{`${index + 1}. ${question.question_text}`}</h5>
          </div>
        );
      })}
    </div>


  )
}
