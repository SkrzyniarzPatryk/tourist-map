import React from "react";
import { Outlet } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";

import "../styles/NavbarStyle.css";


import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import appLogo from "../assets/tourist-app-logo.png";
import usserAccountLogo from "../assets/user_icon.png";

function Root() {
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="home">
              <img
                src={appLogo}
                alt="logo"
                width="90"
                height="40"
                className="d-inline-block align-top"
              />
              {' '}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="home">Strona główna</Nav.Link>
                <Nav.Link href="map">Mapa</Nav.Link>
                <Nav.Link href="points">Punkty</Nav.Link>
                <NavDropdown title="Konto użytkownika" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Moje punkty</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Moje recenzje</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Ustawienia</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form className="d-flex me-3">
                <FormControl
                  type="search"
                  placeholder="Szukaj"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Szukaj</Button>
              </Form>

              <div className="d-flex align-items-center">
                <img
                  src={usserAccountLogo}
                  alt="User Avatar"
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
                />
                <NavDropdown title="" id="user-dropdown" align="end" style={{ color: "#fff" }}>
                  <NavDropdown.Item href="#profile">Profil</NavDropdown.Item>
                  <NavDropdown.Item href="#settings">Ustawienia</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout">Wyloguj się</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="bg-dark">
          <Outlet />
        </div>
        <footer>footer</footer>
      </div>
    </>
  );
}

export default Root;
