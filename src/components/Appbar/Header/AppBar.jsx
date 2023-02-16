import Container from 'react-bootstrap/Container';
import "./AppBar.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


function CollapsibleExample() {
  return (
    <>
    <Navbar className=''  expand="lg" bg="dark" variant='dark'
      fixed='top' >
    <div className="franja-up">
    <div className="franja-up rojo"></div>
    </div>
      
      <Container>
        <Navbar.Brand className='logo-valinkpay' >ValinkPay</Navbar.Brand>
        <Navbar.Toggle  />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Inicio</Nav.Link>
            <Nav.Link id="#que-es-valinkpay" >¿Qué es ValinkPay?</Nav.Link>
            <Nav.Link id="#que-es-valinkpay" >Beneficios</Nav.Link>
            <Nav.Link id="#que-es-valinkpay" >Contacto</Nav.Link>
          </Nav>
          <Nav className='nav-botones' >
            <Link className='btn' to="/register-page">Registro</Link>
            <Link  className='btn btn-2'  to="/login">Acceso Clientessss</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default CollapsibleExample;