import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Sling as Hamburger } from 'hamburger-react'
import "./Navbar.css";

function NavbarComp() {
  return (
    <Navbar expand="lg" className="custom-navbar p-3">
      <Container className="navbar-container">
        <Navbar.Brand href="#home">Mind-Scribe</Navbar.Brand>
        <Navbar.Toggle className="border-none text-white" ><Hamburger  /></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"className="dropdown-link">Add</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"className="dropdown-link">
                My Journals
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"className="dropdown-link">
                Edit Journals
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4"className="dropdown-link">
                Delete Journals
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5"className="dropdown-link text-danger">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
