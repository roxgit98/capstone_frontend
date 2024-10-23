import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../assets/dist/css/style.min.css";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Catalogo from "./components/Catalogo";
import Profilo from "./components/Profilo";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/profilo" element={<Profilo />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
