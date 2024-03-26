import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChooseSubject(props) {
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/question/getSubjects`)
      .then((response) => {
        // console.log(response.data.eventFullDetails.eventDetails.eventdescription);

        setSubject(response?.data?.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const subject = data.get("subject");
    // Redirect to another page with the subject included as a query parameter
    navigate(
      `/CreatePaper/GenaratedPaper?subject=${encodeURIComponent(subject)}`
    );
  };

  const handleSubmitSelect = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const subject = data.get("subject");
    // Redirect to another page with the subject included as a query parameter
    navigate(
      `/QuestionBank/Questions?subject=${encodeURIComponent(subject)}`
    );
  };

  const handleSubmitPaper = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const subject = data.get("subject");
    // Redirect to another page with the subject included as a query parameter
    navigate(
      `/Papers/DisplayPaperComponent?subject=${encodeURIComponent(subject)}`
    );
  };


  if (props.value === 1) {
    return (
      <div>
        <h1>Choose Subject</h1>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <select className="form-control" id="subject" name="subject">
              {subject.map(
                (subjects) =>
                  subjects.subject !== null && (
                    <option key={subjects.subject} value={subjects.subject}>
                      {subjects.subject}
                    </option>
                  )
              )}
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </form>
      </div>
    );
  } else if (props.value === 2) {
    return (
      <div>
        <h1>Choose Subject</h1>
        <br />
        <br />
        <form onSubmit={handleSubmitSelect}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <select className="form-control" id="subject" name="subject">
              {subject.map(
                (subjects) =>
                  subjects.subject !== null && (
                    <option key={subjects.subject} value={subjects.subject}>
                      {subjects.subject}
                    </option>
                  )
              )}
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </form>
      </div>
    );
  } else if (props.value === 3) {
    return (
      <div>
        <h1>Choose Subject</h1>
        <br />
        <br />
        <form onSubmit={handleSubmitPaper}>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <select className="form-control" id="subject" name="subject">
              {subject.map(
                (subjects) =>
                  subjects.subject !== null && (
                    <option key={subjects.subject} value={subjects.subject}>
                      {subjects.subject}
                    </option>
                  )
              )}
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </form>
      </div>
    );
  }
}
