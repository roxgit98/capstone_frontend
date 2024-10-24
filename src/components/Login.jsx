import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/authorization/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("userId", data.utenteId);

        if (data.ruolo === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/profilo");
        }
      } else {
        throw new Error("Problemi col token");
      }
    } catch (error) {
      setErrorMessage(
        "Tentativo di login fallito. Controlla le credenziali inserite"
      );
      console.error("Errore nel login: ", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <Card style={{ width: "35rem" }} text="white">
          <Card.Body>
            <Link to="/">
              <ArrowLeft size={30} color="white" />
            </Link>
            <Card.Title className="text-center fs-1 mb-3">Accedi</Card.Title>
            <Form onSubmit={submit}>
              <Row className="g-3 d-flex flex-column">
                <Col sm={12}>
                  <FloatingLabel controlId="email" label="Email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                    />
                  </FloatingLabel>
                </Col>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              </Row>
              <Card.Footer className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit">
                  Accedi
                </Button>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
