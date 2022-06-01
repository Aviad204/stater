import "./navbar.css";

import React from "react";
import { Container, Navbar } from "react-bootstrap";

function NavbarTop() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar-top">
        <Container className="navbar-top-container">
          <Navbar.Brand>Stater</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarTop;
