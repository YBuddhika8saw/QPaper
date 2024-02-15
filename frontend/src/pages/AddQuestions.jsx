import React from "react";
import { MDBInput, MDBBtn, MDBRange,MDBTextArea } from "mdb-react-ui-kit";
import Sidebar from "../components/Sidebar";

export default function AddQuestions() {
  return (
    <>
      <Sidebar />

      <div className="main">
        <h1> Add Questions </h1>
        <div className="formContainer">
          <form>
            <MDBTextArea
              id="qText"
              wrapperClass="mb-4"
              rows={8}
              label="Question Text"
            />


            <MDBInput wrapperClass="mb-4" id="qTime" label="Question Time" />

            <MDBInput
              wrapperClass="mb-4"
              id="qTime"
              label="Space Allocation in Inches"
            />

            <MDBRange
              defaultValue={1}
              min="1"
              max="3"
              step="1"
              id="qDifficulty"
              label="Question Difficulty"
            />
            <MDBInput wrapperClass="mb-4" id="qType" label="Question Type" />

            <MDBInput wrapperClass="mb-4" id="qSubject" label="Subject" />

            <MDBInput wrapperClass="mb-4" id="qSubjectArea" label="Subject Area" />

            <MDBBtn type="submit" block>
              Add to Bank
            </MDBBtn>
          </form>
        </div>
      </div>
    </>
  );
}
