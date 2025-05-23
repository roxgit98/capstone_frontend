import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Placeholder,
  Row,
} from "react-bootstrap";

const Catalogo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const fetchData = async () => {
    try {
      const url =
        "https://optimistic-dorris-roxgit98-b4431215.koyeb.app/videogiochi/orderAZ";
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
    } catch (error) {
      setError(error.message);
    }
  };

  const addGame = async () => {
    try {
      const url = `https://optimistic-dorris-roxgit98-b4431215.koyeb.app/utenti/me/addGame/${localStorage.getItem(
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
      } else {
        handleShow3();
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
            Vuoi aggiungere questo titolo alla tua collezione?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              addGame();
            }}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Titolo aggiunto!</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal show={show3} onHide={handleClose3} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            Questo titolo è già presente nella tua collezione!
          </Modal.Title>
        </Modal.Header>
      </Modal>

      <div className="d-flex justify-content-center mt-3">
        <FloatingLabel
          controlId="search"
          label="Cerca titolo..."
          className="mb-4"
        >
          <Form.Control
            type="text"
            placeholder="Cerca titolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="lg"
          />
        </FloatingLabel>
      </div>
      <Container fluid="md">
        <Row className="d-flex justify-content-center gy-3">
          {data && data.length > 0 ? (
            data
              .filter((videogioco) =>
                videogioco.titolo.toLowerCase().includes(search.toLowerCase())
              )
              .map((videogioco) => (
                <Col
                  key={videogioco.id}
                  xs={12}
                  sm={7}
                  md={7}
                  lg={5}
                  xl={5}
                  xxl={4}
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
                          Sviluppatori: {videogioco.descrizione}
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
                        variant="success"
                        onClick={() => {
                          getId(videogioco.id);
                          handleShow();
                        }}
                      >
                        Aggiungi alla collezione
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
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

export default Catalogo;
