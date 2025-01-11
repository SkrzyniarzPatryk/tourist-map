import React from "react";
import { Links, Outlet, useLocation } from "react-router-dom";
import { Form, FormControl, Button, Col, Row } from "react-bootstrap";

import "../styles/NavbarStyle.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import appLogo from "../assets/tourist-app-logo.png";
import usserAccountLogo from "../assets/user_icon.png";

import { Link } from "react-router-dom";

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
              />{" "}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="home">Strona główna</Nav.Link>
                <Nav.Link href="map">Mapa</Nav.Link>
                <Nav.Link href="points">Punkty</Nav.Link>
                <NavDropdown title="Konto użytkownika" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Moje punkty
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Moje recenzje
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Ustawienia
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Log out
                  </NavDropdown.Item>
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
                <NavDropdown
                  title=""
                  id="user-dropdown"
                  align="end"
                  style={{ color: "#fff" }}
                >
                  <NavDropdown.Item href="#profile">Profil</NavDropdown.Item>
                  <NavDropdown.Item href="#settings">
                    Ustawienia
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout">
                    Wyloguj się
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="bg-dark" style={{ minHeight: "calc(100vh - 143px)" }}>
          <Outlet />
        </div>
        <footer
          data-bs-theme="dark"
          className="bg-body-tertiary py-1"
          style={{ fontSize: "10px" }}
        >
          <Container>
            <Row>
              <ul className="nav justify-content-center border-bottom mb-2">
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-body-secondary">
                    Strona Główna
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-body-secondary">
                    Strona Główna
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-body-secondary">
                    Strona Główna
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-body-secondary">
                    Strona Główna
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-body-secondary">
                    Strona Główna
                  </Link>
                </li>
              </ul>

              <p className="text-center text-body-secondary mb-2">
                <img
                  src={appLogo}
                  alt="logo"
                  width="50"
                  className="d-inline-block px-1"
                />{" "}
                © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
              </p>
              {/* <Col md={6} className="text-center text-md-start">
                <p>
                  © {new Date().getFullYear()} Moja Strona. Wszelkie prawa
                  zastrzeżone.
                </p>
              </Col>
              <Col md={6} className="text-center text-md-end">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to="/">Strona Główna</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/about">O Nas</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/contact">Kontakt</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/privacy">Polityka Prywatności</Link>
                  </li>
                </ul>
              </Col> */}
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
}

export default Root;
