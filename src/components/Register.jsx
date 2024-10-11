import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/authorization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        handleShow(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore nella registrazione");
      }
    } catch (error) {
      setErrorMessage("Errore nella richiesta: " + error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Registrazione effettuata!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/login">
            <Button variant="success">Vai alla pagina di accesso</Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Container>
        <h1 className="text-white text-center mt-2">Registrazione</h1>
        <Form onSubmit={submit}>
          <Row className="g-5 mt-5">
            <Col xl={6}>
              <FloatingLabel controlId="username" label="username">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  minLength="3"
                  maxLength="30"
                />
              </FloatingLabel>
            </Col>
            <Col xl={6}>
              <FloatingLabel controlId="email" label="email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xl={6}>
              <FloatingLabel controlId="password" label="password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
              </FloatingLabel>
            </Col>
            <Col xl={6}>
              <FloatingLabel controlId="nome" label="nome">
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  maxLength="10"
                />
              </FloatingLabel>
            </Col>
            <Col xl={6}>
              <FloatingLabel controlId="cognome" label="cognome">
                <Form.Control
                  type="text"
                  name="cognome"
                  placeholder="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  maxLength="20"
                />
              </FloatingLabel>
            </Col>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Row>
          <Button variant="primary" type="submit" className="mt-5">
            Conferma
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
