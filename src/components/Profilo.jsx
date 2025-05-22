import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
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
  const [show3, setShow3] = useState(false);
  const [avatar, setAvatar] = useState(undefined);
  const resetForm = () => {
    setAvatar(undefined);
  };
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleShow3 = () => setShow3(true);

  const fetchData = async () => {
    try {
      const url = "optimistic-dorris-roxgit98-b4431215.koyeb.app/utenti/me";
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
      const url = `optimistic-dorris-roxgit98-b4431215.koyeb.app/utenti/me/removeGame/${localStorage.getItem(
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

  const updateAvatar = async (file) => {
    try {
      const url =
        "optimistic-dorris-roxgit98-b4431215.koyeb.app/utenti/me/avatar";
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchData();
        resetForm();
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    updateAvatar(file);
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

      <Modal show={show3} onHide={handleClose3} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Scegli un'immagine</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Control
            type="file"
            name="avatar"
            placeholder="avatar"
            value={avatar}
            onChange={handleFileChange}
          />
          <Modal.Footer>
            <Button
              variant="success"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleClose3();
              }}
            >
              Conferma
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {isAdmin && (
        <Link to="/admin">
          <Button variant="info" className="my-3">
            Gestione catalogo
          </Button>
        </Link>
      )}
      <Container fluid="md" className="mt-3">
        <Row className="d-flex justify-content-center gy-3">
          {data ? (
            <>
              <Col xs={8} sm={5} md={6} lg={4} xl={3} xxl={3} key={data.id}>
                <img
                  src={data.avatar}
                  alt="avatar"
                  className="img-thumbnail"
                  width={240}
                  height={240}
                />
              </Col>
              <Col xs={10} sm={7} md={6} lg={6} xl={6} xxl={6}>
                <Card text="white" style={{ width: "20rem" }}>
                  <Card.Body>
                    <Card.Title className="text-center">
                      {data.username}
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Email: {data.email}</ListGroup.Item>
                      <ListGroup.Item>Nome: {data.nome}</ListGroup.Item>
                      <ListGroup.Item>Cognome: {data.cognome}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleShow3}>
                      Cambia avatar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>

              <h1 className="mb-5 text-center text-primary">
                Collezione di {data.username}
              </h1>
              {data.videogioco.length === 0 && (
                <Alert variant="info">La tua collezione è vuota</Alert>
              )}
              {data.videogioco &&
                data.videogioco.map((videogioco) => (
                  <Col
                    xs={12}
                    sm={8}
                    md={7}
                    lg={5}
                    xl={5}
                    xxl={4}
                    key={videogioco.id}
                  >
                    <Card text="white" style={{ width: "24rem" }}>
                      <Card.Img
                        variant="top"
                        src={videogioco.boxArt}
                        width={490}
                        height={490}
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
                            Anno di pubblicazione:{" "}
                            {videogioco.annoDiPubblicazione}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Piattaforma: {videogioco.piattaforma}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Genere: {videogioco.genere}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Totale ore richieste per la conclusione:{" "}
                            {videogioco.totaleOreDiGioco} ore
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
                  </Col>
                ))}
            </>
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
      </Container>
    </>
  );
};

export default Profilo;
