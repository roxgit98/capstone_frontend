import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
