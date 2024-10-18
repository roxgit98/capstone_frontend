import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Placeholder,
  Row,
} from "react-bootstrap";

const Admin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titolo: "",
    descrizione: "",
    annoDiPubblicazione: 0,
    piattaforma: "",
    genere: "",
    totaleOreDiGioco: 0,
    boxArt: undefined,
  });
  const [show, setShow] = useState(false);
  const [showPatch, setShowPatch] = useState(false);
  const [showPut, setShowPut] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = () => setShow(false);
  const handleClosePatch = () => setShowPatch(false);
  const handleClosePut = () => setShowPut(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShow = () => setShow(true);
  const handleShowPatch = () => setShowPatch(true);
  const handleShowPut = () => setShowPut(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setFormData({
      titolo: "",
      descrizione: "",
      annoDiPubblicazione: 0,
      piattaforma: "",
      genere: "",
      totaleOreDiGioco: 0,
      boxArt: undefined,
    });
  };

  //chiamata GET

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

  //chiamata POST

  const postData = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/videogiochi";
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  //chiamata PATCH

  const patchData = async (file) => {
    try {
      const url = `http://localhost:3001/videogiochi/${localStorage.getItem(
        "videogiocoId"
      )}/boxArt`;
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

  //chiamata PUT

  const putData = async (updatedData) => {
    try {
      const url = `http://localhost:3001/videogiochi/${localStorage.getItem(
        "videogiocoId"
      )}`;
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
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

  //chiamata DELETE

  const deleteData = async (id) => {
    try {
      const url = `http://localhost:3001/videogiochi/${localStorage.getItem(
        "videogiocoId"
      )}`;
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchData();
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
    patchData(file);
  };

  const getId = (id) => {
    localStorage.setItem("videogiocoId", id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* modale creazione videogioco */}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Inserisci videogioco</Modal.Title>
        </Modal.Header>
        <Form onSubmit={postData}>
          <Row>
            <Col xl={12}>
              <FloatingLabel controlId="titolo" label="Titolo">
                <Form.Control
                  type="text"
                  name="titolo"
                  placeholder="Titolo"
                  value={formData.titolo}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="descrizione" label="Descrizione">
                <Form.Control
                  type="text"
                  name="descrizione"
                  placeholder="Descrizione"
                  value={formData.descrizione}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel
                controlId="annoDiPubblicazione"
                label="Anno di pubblicazione"
              >
                <Form.Control
                  type="number"
                  name="annoDiPubblicazione"
                  placeholder="Anno di pubblicazione"
                  value={formData.annoDiPubblicazione}
                  onChange={handleChange}
                  required
                  min="1970"
                  max="2100"
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="piattaforma" label="Piattaforma">
                <Form.Control
                  type="text"
                  name="piattaforma"
                  placeholder="Piattaforma"
                  value={formData.piattaforma}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="genere" label="Genere">
                <Form.Control
                  type="text"
                  name="genere"
                  placeholder="Genere"
                  value={formData.genere}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              className="m-3"
              onClick={handleClose}
            >
              Conferma
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modale della box art */}

      <Modal show={showPatch} onHide={handleClosePatch} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Inserisci box art</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Control
            type="file"
            name="boxArt"
            placeholder="box art"
            value={formData.boxArt}
            onChange={handleFileChange}
          />
          <Modal.Footer>
            <Button
              variant="success"
              type="button"
              className="m-3"
              onClick={(e) => {
                e.preventDefault();
                handleClosePatch();
              }}
            >
              Conferma
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modale modifica dati */}

      <Modal show={showPut} onHide={handleClosePut} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Modifica dati</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const updatedData = {
              titolo: formData.titolo,
              descrizione: formData.descrizione,
              annoDiPubblicazione: formData.annoDiPubblicazione,
              piattaforma: formData.piattaforma,
              genere: formData.genere,
              totaleOreDiGioco: formData.totaleOreDiGioco,
            };
            putData(updatedData);
          }}
        >
          <Row>
            <Col xl={12}>
              <FloatingLabel controlId="titolo" label="Titolo">
                <Form.Control
                  type="text"
                  name="titolo"
                  placeholder="Titolo"
                  value={formData.titolo}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="descrizione" label="Descrizione">
                <Form.Control
                  type="text"
                  name="descrizione"
                  placeholder="Descrizione"
                  value={formData.descrizione}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel
                controlId="annoDiPubblicazione"
                label="Anno di pubblicazione"
              >
                <Form.Control
                  type="number"
                  name="annoDiPubblicazione"
                  placeholder="Anno di pubblicazione"
                  value={formData.annoDiPubblicazione}
                  onChange={handleChange}
                  required
                  min="1970"
                  max="2100"
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="piattaforma" label="Piattaforma">
                <Form.Control
                  type="text"
                  name="piattaforma"
                  placeholder="Piattaforma"
                  value={formData.piattaforma}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xl={12}>
              <FloatingLabel controlId="genere" label="Genere">
                <Form.Control
                  type="text"
                  name="genere"
                  placeholder="Genere"
                  value={formData.genere}
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              className="m-3"
              onClick={handleClosePut}
            >
              Conferma
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modale eleminazione videogioco */}

      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            Sei sicuro di voler eleminare questo videogioco?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteData();
              handleCloseDelete();
            }}
          >
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {/* inizio pagina catalogo */}

      <h1 className="text-white text-center my-3">Gestione catalogo</h1>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" onClick={handleShow} className="mb-3">
          Aggiungi titolo
        </Button>
      </div>
      <Row>
        {data && data.content && data.content.length > 0 ? (
          data.content.map((videogioco) => (
            <Col key={videogioco.id} sm={6} className="mb-5">
              <Card
                bg="dark"
                text="white"
                style={{ width: "35rem" }}
                border="light"
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
                  <div className="d-flex mt-3 gap-3 justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => {
                        getId(videogioco.id);
                        handleShowPatch();
                      }}
                    >
                      Aggiungi box art
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        getId(videogioco.id);
                        handleShowPut();
                      }}
                    >
                      Modifica
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        getId(videogioco.id);
                        handleShowDelete();
                      }}
                    >
                      Elimina titolo
                    </Button>
                  </div>
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
