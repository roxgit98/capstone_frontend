import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nome: "",
    cognome: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
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
        "https://optimistic-dorris-roxgit98-b4431215.koyeb.app/authorization/register",
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
      <div className="d-flex justify-content-center mt-3">
        <Card style={{ width: "35rem" }} text="white">
          <Card.Body>
            <Link to="/">
              <ArrowLeft size={30} color="white" />
            </Link>
            <Card.Title className="text-center fs-1 mb-3">
              Registrazione
            </Card.Title>
            <Form onSubmit={submit}>
              <Row className="g-3 d-flex flex-column">
                <Col sm={12}>
                  <FloatingLabel controlId="username" label="Username">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      minLength="3"
                      maxLength="30"
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={12}>
                  <FloatingLabel controlId="email" label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={12}>
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={12}>
                  <FloatingLabel controlId="nome" label="Nome">
                    <Form.Control
                      type="text"
                      name="nome"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      maxLength="10"
                    />
                  </FloatingLabel>
                </Col>
                <Col sm={12}>
                  <FloatingLabel controlId="cognome" label="Cognome">
                    <Form.Control
                      type="text"
                      name="cognome"
                      placeholder="Cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                      maxLength="20"
                    />
                  </FloatingLabel>
                </Col>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              </Row>
              <Card.Footer className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit">
                  Conferma
                </Button>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Register;
