import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="text-center mt-5">
        <h2 className="text-white">Benvenuto!</h2>

        <div className="d-flex justify-content-center gap-4">
          <Button variant="primary">Accedi</Button>
          <Button variant="primary">Registrati</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
