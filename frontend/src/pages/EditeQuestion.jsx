import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBRange, MDBTextArea } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditeQuestion() {
  const [qText, setQText] = useState("");
  const [qTime, setqTime] = useState("");
  const [qType, setqType] = useState("");
  const [qSubject, setqSubject] = useState("");
  const [qSubjectArea, setqSubjectArea] = useState("");
  const [qDifficulty, setqDifficulty] = useState(1);
  const [qSpace, setqSpace] = useState("");
  const [qMarks, setqMarks] = useState("");
  const [qId, setqId] = useState("");

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
      qMarks,
      qId,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/question/editQuestion`,
        { formData }
      );

      // Check if the request was successful
      if (response) {
        // Display success message
        Swal.fire("Question successfully edited");
        // Reset form fields
        resetForm();
      } else {
        // Display error message
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while adding the question",
      });
    }
  };

  const resetForm = () => {
    setQText("");
    setqTime("");
    setqType("");
    setqSubject("");
    setqSubjectArea("");
    setqDifficulty(1);
    setqSpace("");
    setqMarks("");
    setqId("");
  };

  const isFormValid = () => {
    return (
      qText &&
      qTime &&
      qType &&
      qSubject &&
      qSubjectArea &&
      qSpace &&
      qMarks &&
      qId
    );
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="main">
        <div className="formContainer">
          <h1> Edit Questions </h1>
          <form
            onSubmit={submitHandler}
            method="post"
            encType="multipart/form-data"
          >
            <MDBTextArea
              id="qText"
              wrapperClass="mb-4"
              rows={5}
              label="Question Text"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              required
            />

            <br />

            <MDBInput
              wrapperClass="mb-4"
              id="qTime"
              label="Question Time"
              type="number"
              pattern="[0-9]*"
              value={qTime}
              onChange={(e) => setqTime(e.target.value)}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qId"
              label="Question Id"
              type="number"
              pattern="[0-9]*"
              value={qId}
              onChange={(e) => setqId(e.target.value)}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qMarks"
              label="Question Mark"
              type="number"
              pattern="[0-9]*"
              value={qMarks}
              onChange={(e) => setqMarks(e.target.value)}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSpace"
              label="Space Allocation in Inches"
              type="number"
              pattern="[0-9]*"
              value={qSpace}
              onChange={(e) => setqSpace(e.target.value)}
              required
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
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              id="qType"
              label="Question Type"
              value={qType}
              onChange={(e) => setqType(e.target.value)}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSubject"
              label="Subject"
              value={qSubject}
              onChange={(e) => setqSubject(e.target.value)}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              id="qSubjectArea"
              label="Subject Area"
              value={qSubjectArea}
              onChange={(e) => setqSubjectArea(e.target.value)}
              required
            />

            {isFormValid() && (
              <MDBBtn type="submit" block>
                Add to Bank
              </MDBBtn>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
