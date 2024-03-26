import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import { Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Modal from "react-bootstrap/Modal";


export default function GenPapersSelectedQuestions() {
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

  const selectId = async(selectedIds) => {
    console.log('selectedIds');
    console.log(selectedIds);
  }

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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
                  {selectId(selectedIds)}  </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
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
