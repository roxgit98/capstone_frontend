import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  Placeholder,
  Row,
} from "react-bootstrap";

const Admin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const url = "http://localhost:3001/videogiochi";
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-white text-center my-3">Gestione catalogo</h1>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary">Aggiungi titolo</Button>
        <Button variant="danger">Elimina titolo</Button>
      </div>
      <Row>
        {data && data.content && data.content.length > 0 ? (
          data.content.map((videogioco) => (
            <Col key={videogioco.id} md={6}>
              <Card
                bg="dark"
                text="white"
                style={{ width: "18rem" }}
                border="dark"
              >
                <Card.Img variant="top" src={videogioco.boxArt} />
                <Card.Body>
                  <Card.Title className="text-center">
                    {videogioco.titolo}
                  </Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="list-group-item-secondary">
                      Descrizione: {videogioco.descrizione}
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-secondary">
                      Anno di pubblicazione: {videogioco.annoDiPubblicazione}
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-secondary">
                      Piattaforma: {videogioco.piattaforma}
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group-item-secondary">
                      Genere: {videogioco.genere}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary" className="mt-3">
                    Modifica
                  </Button>
                </Card.Body>
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
    </>
  );
};

export default Admin;
