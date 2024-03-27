import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function ViewQuestionDetailsModel(props) {
  // Access the data prop
  const { data, onHide } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true); // Open delete question modal
    onHide(); // Close view question details modal
  };

  // use the data prop modal
  return (
    <>
      {" "}
      {/* modal for delete question */}
      <Modal show={show} onHide={handleClose} style={{ marginTop: "5px" }} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Do you realy want to delete this Question</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal for view question details  */}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {data && data.question_text}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tr>
              <td>
                <b>Question Mark :</b>
              </td>
              <td style={{ verticalAlign: "middle" }}>{data && data.mark}</td>
            </tr>
            <tr>
              <td>
                <b>Difficulty Level :</b>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {data && data.difficulty_level}
              </td>
            </tr>
            <tr>
              <td>
                <b>Subject Area :</b>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                {data && data.subject_area}
              </td>
            </tr>
          </table>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ backgroundColor: "red", float: "right"}}
          >
            <FaTrash size={15} />
          </Button>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{ backgroundColor: "#f0d805", float: "right", marginRight: "10px"}}
          >
            <FaPencilAlt size={15} />
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function SubjectQuestions() {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  //delete modal

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
      setSelectedIds(selectedIds.filter((id) => id !== questionId));
    } else {
      // If not selected, add it to the array
      setSelectedIds([...selectedIds, questionId]);
    }
  };

  const sendIds = () => {
    // Redirect to another page with the selectedIds included as a query parameter
    navigate(
      `/QuestionBank/GenaratedPaper?selectedIds=${encodeURIComponent(
        selectedIds.join(",")
      )} &subject=${encodeURIComponent(subject)}`
    );
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="genarateQuestionMain">
        <h1>{subject} Questions</h1>
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
                  <Button variant="primary" onClick={() => setModalShow(index)}>
                    View
                  </Button>

                  <ViewQuestionDetailsModel
                    key={index}
                    show={modalShow === index}
                    onHide={() => setModalShow(null)}
                    data={question}
                  />
                </td>
                <td style={{ width: "10%" }}>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id={`checkbox-${question.question_id}`}
                      value={question.question_id}
                      onChange={() => handleIdChange(question.question_id)}
                    />
                    <label
                      htmlFor={`checkbox-${question.question_id}`}
                      className="custom-checkbox"
                    ></label>
                  </div>
                </td>
              </div>
            );
          })}
        </table>
        <Button type="Submit" onClick={sendIds}>
          Create Paper
        </Button>
      </div>
    </div>
  );
}
