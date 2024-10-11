import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-center mt-5">
        <h2 className="text-white">Benvenuto!</h2>

        <div className="d-flex justify-content-center gap-4">
          <Link to="/login">
            <Button variant="primary">Accedi</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Registrati</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
