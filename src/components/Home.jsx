import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Card style={{ width: "35rem" }} text="white">
          <Card.Body>
            <Card.Title className="text-center fs-1">
              Benvenuto in VDGDB!
            </Card.Title>
            <Card.Text className="text-center fs-4">
              La tua collezione personale di videogiochi. Effettua l'accesso
              oppure registrati.
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center gap-4">
            <Link to="/login">
              <Button variant="primary">Accedi</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Registrati</Button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Home;
