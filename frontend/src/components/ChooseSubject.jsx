import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChooseSubject() {
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

  return (
    <div>
      <h1>Choose Subject</h1>
      <br />
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>

          <select className="form-control" id="subject">
            {subject.map((subjects) => (
              <option value={subjects.subject}>{subjects.subject}</option>
            ))}
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
