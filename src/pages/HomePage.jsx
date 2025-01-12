import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

const HomePage = () => {
  return (
    <div style={{color:"white"}}>
      {/* Sekcja karuzeli */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="Pierwszy slajd"
          />
          <Carousel.Caption>
            <h5>Odkrywaj Najlepsze Atrakcje</h5>
            <p>Znajdź miejsca, które warto odwiedzić.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Drugi slajd"
          />
          <Carousel.Caption>
            <h5>Planuj Trasę</h5>
            <p>Stwórz swoją idealną trasę podróży.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image3}
            alt="Trzeci slajd"
          />
          <Carousel.Caption>
            <h5>Podziel się Wrażeniami</h5>
            <p>Oceniaj i recenzuj odwiedzone miejsca.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sekcja funkcji */}
      <Container className="mt-5">
        <h2 className="text-center">Funkcjonalności</h2>
        <Row className="mt-4">
          <Col md={4} className="text-center">
            <img
              src="assets/react.svg"
              alt="Mapa interaktywna"
              className="mb-3"
              style={{ width: "80px" }}
            />
            <h5>Interaktywna Mapa</h5>
            <p>Przeglądaj punkty zainteresowań na mapie.</p>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="assets/user_icon.png"
              alt="Filtrowanie"
              className="mb-3"
              style={{ width: "80px" }}
            />
            <h5>Kategorie</h5>
            <p>Filtruj miejsca według kategorii i preferencji.</p>
          </Col>
          <Col md={4} className="text-center">
            <img
              src="assets/tourist-app-logo.png"
              alt="Opinie i oceny"
              className="mb-3"
              style={{ width: "80px" }}
            />
            <h5>Opinie i Oceny</h5>
            <p>Sprawdź recenzje i oceny od innych podróżnych.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
