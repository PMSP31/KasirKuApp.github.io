import React from "react";
import { Navbar, Nav,Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCashRegister} from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = () => {
  return (
      <Navbar variant="dark" expand="lg">
        <Container>
        <FontAwesomeIcon icon={faCashRegister} color="white" className="mr-1"/>
        <Navbar.Brand href="#home"><strong>KasirKu</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};
export default NavbarComponent;
