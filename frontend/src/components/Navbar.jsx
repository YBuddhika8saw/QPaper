import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
  return (
    <div style={{ position: "sticky", top: "0", left: "0", width: "100%",zIndex: "9999", backgroundColor:"white"}}>
      <Navbar
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home">QPaper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="#features">Papers</Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default ColorSchemesExample;
