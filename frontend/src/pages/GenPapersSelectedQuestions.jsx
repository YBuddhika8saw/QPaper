import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import { Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function GenPapersSelectedQuestions() {
  const [paperName, setPaperName] = useState();
  const [paperSubject, setPaperSubject] = useState();
  const [paperExam, setPaperExam] = useState();
  const navigate = useNavigate();

  // Create a reference to the PDF component
  const options = {
    filename: "questionpaper.pdf",
    orientation: "portrait",
    unit: "in",
    format: "a4",
  };
  const { toPDF, targetRef } = usePDF(options);

  const [modalShow, setModalShow] = React.useState(false);

  // State to hold questions
  const [questions, setQuestions] = useState([]);

  // Memoize selectedIds
  const selectedIds = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedIdsString = params.get("selectedIds");
    return selectedIdsString ? selectedIdsString.split(",") : [];
  }, []);


  
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  // Fetch questions when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await Promise.all(
          selectedIds.map(async (id) => {
            const response = await axios.get(
              `http://localhost:5000/api/question/getQuestionsById?qId=${id}`
            );
            return response.data.questions;
          })
        );
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedIds]);

  //Save paper from submit handler
  const handleSubmitForPaper = async (e) => {
    e.preventDefault();
    const paperData = {
      paperName,
      paperSubject,
      paperExam,
      selectedIds,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/paper/addPaper`,
        { paperData }
      );
      console.log("Paper saved successfully:", response);
      showSuccessMsg();
      setModalShow(false);
    } catch (error) {
      console.error("Error saving paper:", error);
    }
  };

  //show success msg after saving paper
  const showSuccessMsg = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Paper has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    setPaperName("");
    setPaperSubject("");
    setPaperExam("");
    navigate(`/`);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Paper Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitForPaper} method="post">
            <div className="form-group">
              <label htmlFor="paperTitle">Paper Name</label>
              <input
                type="text"
                className="form-control"
                id="paperTitle"
                placeholder="Enter Paper Title"
                onChange={(e) => setPaperName(e.target.value)}
              />
              <label htmlFor="paperTitle">Subject</label>
              <input
                type="text"
                className="form-control"
                id="paperTitle"
                placeholder="Subject"
                onChange={(e) => setPaperSubject(e.target.value)}
              />
              <label htmlFor="paperTitle">Exam Name</label>
              <input
                type="text"
                className="form-control"
                id="paperTitle"
                placeholder="Exam Name"
                onChange={(e) => setPaperExam(e.target.value)}
              />
              <br />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setModalShow(false)}
            style={{ backgroundColor: "#f24f44" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="genarateQuestionMain">
        {/* create the PDF component  */}
        <div ref={targetRef}>
          {questions.map((questionList, index) => (
            <div key={index}>
              {questionList.map((question, innerIndex) => {
                const ansHeight = question.space_allocated * 96; // Calculate height based on the space_allocated property of the question (1 Inch = 96px)
                return (
                  <div className="questionBox" key={innerIndex}>
                    <h5>{`${index + 1}. ${question.question_text}`}</h5>

                    <div style={{ textAlign: "right" }}>
                      {question.mark} marks
                    </div>
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
          ))}
        </div>
        <Button
          as="input"
          type="submit"
          onClick={() => toPDF()}
          value="Download PDF"
        />{" "}
        <Button
          style={{ backgroundColor: "#fac532" }}
          onClick={() => setModalShow(true)}
        >
          Save Paper
        </Button>
      </div>
    </div>
  );
}
