import React from "react";
import { MDBInput, MDBBtn, MDBRange, MDBTextArea } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddQuestions() {
  const [qText, setQText] = useState("");
  const [qTime, setqTime] = useState("");
  const [qType, setqType] = useState("");
  const [qSubject, setqSubject] = useState("");
  const [qSubjectArea, setqSubjectArea] = useState("");
  const [qDifficulty, setqDifficulty] = useState("");
  const [qSpace, setqSpace] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      qText,
      qTime,
      qType,
      qSubject,
      qSubjectArea,
      qDifficulty,
      qSpace,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/question/addQuestion`,
        { formData }
      );

      // Check if the request was successful
      if (response.status === 201 && response.data.key === "success") {
        // Display success message
        Swal.fire("Question added successfully");
        // alert('');
        // Reset form fields
        setQText("");
        setqTime("");
        setqType("");
        setqSubject("");
        setqSubjectArea("");
        setqDifficulty(1);
        setqSpace("");
      } else {
        // Display error message
        // alert('Failed to add question');
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add question",
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      // Display error message
      // alert('An error occurred while adding the question');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while adding the question",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="main">
        <div className="formContainer">
          <h1> Add Questions </h1>
          <form onSubmit={submitHandler} method="post">
            <MDBTextArea
              id="qText"
              wrapperClass="mb-4"
              rows={5}
              label="Question Text"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qTime"
              label="Question Time"
              type="number"
              pattern="[0-9]*"
              value={qTime}
              onChange={(e) => setqTime(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSpace"
              label="Space Allocation in Inches"
              type="number"
              pattern="[0-9]*"
              value={qSpace}
              onChange={(e) => setqSpace(e.target.value)}
            />

            <MDBRange
              defaultValue={1}
              min="1"
              max="3"
              step="1"
              id="qDifficulty"
              label="Question Difficulty"
              value={qDifficulty}
              onChange={(e) => setqDifficulty(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              id="qType"
              label="Question Type"
              value={qType}
              onChange={(e) => setqType(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSubject"
              label="Subject"
              value={qSubject}
              onChange={(e) => setqSubject(e.target.value)}
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSubjectArea"
              label="Subject Area"
              value={qSubjectArea}
              onChange={(e) => setqSubjectArea(e.target.value)}
            />

            <MDBBtn type="submit" block>
              Add to Bank
            </MDBBtn>
          </form>
        </div>
      </div>
    </>
  );
}
