import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "react-bootstrap/Card";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      {/* import sidebar from '../components/Sidebar' */}
      <Sidebar />
      <div className="main">
      <div className="topRow">
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Subjects
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        534
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Questions
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        534
      </Card.Text>
    </Card.Body>
  </Card>
  <Card className="dashboardCard">
    <Card.Body style={{backgroundColor:"#f5f7fa"}}>
      <Card.Title style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem" }}>
        Total Papers
      </Card.Title>
      <Card.Text style={{ textAlign: "center", fontWeight: "bold" }}>
        534
      </Card.Text>
    </Card.Body>
  </Card>
</div>

<div class="bottomRow">
  <table class="dashboardTable">
    <thead>
      <tr>
        <th>Subject</th>
        <th>Questions</th>
        <th>Papers</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}
