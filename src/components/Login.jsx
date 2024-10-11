import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

      if (!response.ok) {
        throw new Error("Tentativo di login fallito");
      }

      const data = await response.json();

      if (data.accessToken) {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("userId", data.utenteId);
        console.log(data.accessToken);

        if (data.ruolo === "ADMIN") {
          navigate("/admin");
        } else {
          navigate(`/user/${data.utenteId}`);
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
    <Container>
      <h1 className="text-white text-center mt-2">Accesso</h1>
      <Form onSubmit={submit}>
        <Row className="g-5 mt-5">
          <Col xl={6}>
            <FloatingLabel controlId="email" label="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </FloatingLabel>
          </Col>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Row>
        <Button variant="primary" type="submit" className="mt-5">
          Accedi
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
