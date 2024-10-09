import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.svg";

const MyNavbar = () => {
  return (
    <Navbar className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="#logo">
          <img src={logo} alt="logo" width={70} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="#catalogo" className="text-white">
              Catalogo
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
