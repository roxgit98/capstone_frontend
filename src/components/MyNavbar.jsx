import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/Steam_icon_logo.svg";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar className="bg-secondary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" width={60} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav>
            <Link to="/" className="text-white nav-link">
              Home
            </Link>
            <Link to="/catalogo" className="text-white nav-link">
              Catalogo
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link to="/profilo" className="text-white nav-link">
              Profilo
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
