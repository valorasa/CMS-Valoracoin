import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>CMS Valoracoin</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to="/impactos"
              className="text-white mx-2 text-decoration-none"
            >
               Impactos
            </NavLink>
            <NavLink
            to="/usuarios"
            className="text-white mx-2 text-decoration-none"
            >
              usuarios
            </NavLink>
            <NavLink
            to="/compensação"
            className="text-white mx-2 text-decoration-none"
            >
              compensação
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavigationBar;
