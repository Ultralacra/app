import Container from 'react-bootstrap/Container';
import "./AppBar.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


function CollapsibleExample() {
  return (
    <>
    
    <Navbar className='appbar'  expand="lg" bg="light" fixed='top' >
      
      <Container>
      <div className="franja-up">
    <div className="franja-up calipso"></div>
    <div className="franja-up rojo"></div>
    </div>
        <Navbar.Brand>ValinkPay</Navbar.Brand>
        <Navbar.Toggle  />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Inicio</Nav.Link>
            <Nav.Link id="#que-es-valinkpay" >¿Qué es ValinkPay?</Nav.Link>
            <Nav.Link id="#que-es-valinkpay" >Preguntas frecuentes</Nav.Link>
          </Nav>
          <Nav className='nav-botones' >
            <Link className='btn' to="/register-page">Registro</Link>
            <Link  className='btn btn-2'  to="/login">Acceso Clientes</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default CollapsibleExample;