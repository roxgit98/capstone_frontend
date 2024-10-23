import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  ListGroup,
  Modal,
  Placeholder,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Profilo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  const fetchData = async () => {
    try {
      const url = "http://localhost:3001/utenti/me";
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore nella ricezione dei dati");
      }

      const responseData = await response.json();

      setData(responseData);
      if (responseData.ruolo === "ADMIN") {
        setIsAdmin(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const removeGame = async () => {
    try {
      const url = `http://localhost:3001/utenti/me/removeGame/${localStorage.getItem(
        "videogiocoId"
      )}`;
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        handleShow2();
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getId = (id) => {
    localStorage.setItem("videogiocoId", id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            Vuoi rimuovere questo titolo dalla tua collezione?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              removeGame();
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Titolo rimosso!</Modal.Title>
        </Modal.Header>
      </Modal>

      <h1 className="text-white text-center my-3">Profilo</h1>
      {isAdmin && (
        <Link to="/admin">
          <Button variant="info">Gestione catalogo</Button>
        </Link>
      )}

      <Row className="d-flex justify-content-center">
        {data ? (
          <Col key={data.id} sm={6} className="mb-5">
            <Card text="white" style={{ width: "35rem" }} className="mb-5">
              <Card.Img variant="top" src={data.avatar} className="img-fluid" />
              <Card.Body>
                <Card.Title className="text-center">
                  Username: {data.username}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Email: {data.email}</ListGroup.Item>
                  <ListGroup.Item>Nome: {data.nome}</ListGroup.Item>
                  <ListGroup.Item>Cognome: {data.cognome}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <h1 className="mb-5 text-white text-center">
              Collezione di {data.username}
            </h1>
            {data.videogioco.length === 0 && (
              <Alert variant="info">La tua collezione è vuota</Alert>
            )}
            {data.videogioco &&
              data.videogioco.map((videogioco) => (
                <Card
                  text="white"
                  style={{ width: "35rem" }}
                  className="mb-5"
                  key={videogioco.id}
                >
                  <Card.Img
                    variant="top"
                    src={videogioco.boxArt}
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      {videogioco.titolo}
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        Descrizione: {videogioco.descrizione}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Anno di pubblicazione: {videogioco.annoDiPubblicazione}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Piattaforma: {videogioco.piattaforma}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Genere: {videogioco.genere}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        getId(videogioco.id);
                        handleShow();
                      }}
                    >
                      Rimuovi dalla collezione
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
          </Col>
        ) : (
          <Card style={{ width: "18rem" }} bg="dark" text="white">
            <Card.Img variant="top" src="https://placehold.co/400" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
};

export default Profilo;
