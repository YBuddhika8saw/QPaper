import React from "react";
import { MDBInput, MDBBtn, MDBRange, MDBTextArea } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios"; 

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
      qSpace
    };


    axios.post(`http://localhost:5000/api/question/addQuestion`, { formData })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });


  
  };

  return (
    <>
      <Sidebar />

      <div className="main">
        <h1> Add Questions </h1>
        <div className="formContainer">
          <form onSubmit={submitHandler} method="post">
            <MDBTextArea
              id="qText"
              wrapperClass="mb-4"
              rows={8}
              label="Question Text"
              value={qText}
              onChange={(e) => setQText(e.target.value)}
            />

            <MDBInput wrapperClass="mb-4" id="qTime" label="Question Time" value={qTime} onChange={(e) => setqTime(e.target.value)}/>

            <MDBInput
              wrapperClass="mb-4"
              id="qSpace"
              label="Space Allocation in Inches"
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
            <MDBInput wrapperClass="mb-4" id="qType" label="Question Type" value={qType} onChange={(e) => setqType(e.target.value)} />

            <MDBInput wrapperClass="mb-4" id="qSubject" label="Subject" value={qSubject} onChange={(e) => setqSubject(e.target.value)} />

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
