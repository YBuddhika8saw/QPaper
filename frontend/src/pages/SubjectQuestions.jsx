import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button} from "react-bootstrap";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate } from "react-router-dom";

export default function SubjectQuestions() {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

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

  const handleIdChange = (questionId) => {
    // Check if the questionId is already selected
    if (selectedIds.includes(questionId)) {
      // If selected, remove it from the array
      setSelectedIds(selectedIds.filter(id => id !== questionId));
    } else {
      // If not selected, add it to the array
      setSelectedIds([...selectedIds, questionId]);
    }
  };

  const sendIds = () => {
    // Redirect to another page with the selectedIds included as a query parameter
    navigate(
      `/QuestionBank/GenaratedPaper?selectedIds=${encodeURIComponent(selectedIds.join(','))}`
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className='genarateQuestionMain'>
      <h1>{subject} Questions</h1>
      
      {questions.map((question, index) => {
        return (
          <div className="questionBox" key={index}>
            <h5>{`${index + 1}. ${question.question_text}`}</h5>
            <input
              type="checkbox"
              value={question.question_id}
              onChange={() => handleIdChange(question.question_id)}
            />
          </div>
          
        );
      })}

      <Button type="Submit" onClick={sendIds}>Create Paper</Button>

      </div>
    </div>
  );
}
