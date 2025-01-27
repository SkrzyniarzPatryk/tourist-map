import React from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import icon2 from "../assets/icon2.png"; // Dodaj ścieżkę do logo
import icon1 from "../assets/icon1.png"; // Dodaj ścieżkę do logo
import icon3 from "../assets/icon3.png"; // Dodaj ścieżkę do logo

const HomePage = () => {
  const carouselStyle = {
    height: "500px", // Stała wysokość karuzeli
    position: "relative",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Dopasowanie obrazka do karuzeli
  };

  const contentWrapperStyle = {
    position: "absolute", 
    top: "50%", 
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%", // Ograniczenie szerokości tekstu
    textAlign: "start", // Wyrównanie tekstu do lewej
    color: "Black", // Kolor tekstu
    display: "flex",
    flexDirection: "column",
    alignItems: "start",  
    gap: "20px", // Odstęp między tekstem a przyciskiem
  };

  const buttonWrapperStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    gap: "15px", // Odstęp między tekstem a przyciskiem
  };

  const textStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.5",
  };

  const featureCardStyle = {
    backgroundColor: "#fff",  // Kolor tła
    padding: "20px",  
    borderRadius: "10px", 
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",   
  };

  const featureIconStyle = {
    width: "80px",  
  };

  return (
    <div>
      <Carousel style={carouselStyle}>
        <Carousel.Item>
          <div style={carouselStyle}>
            <img src={img1} alt="Pierwszy slajd" style={imageStyle} />
            <div style={contentWrapperStyle}>
            <div style={textStyle}>
              <h1 className="display-4 fw-bold">Odkryj Świat z Nami!</h1>
              <p className="lead">
                <b>
                Zaloguj się, by korzystać z interaktywnej mapy pełnej atrakcji turystycznych.
                Odkrywaj szczegóły miejsc, planuj trasy, filtruj interesujące Cię lokalizacje i
                dziel się swoimi opiniami. Twoja przygoda zaczyna się tutaj!
                </b>
              </p>
            </div>
            <div style={buttonWrapperStyle}>
            <Button
              as={Link}
              to="/login"
              variant="primary"
              size="lg"
            >
              Zaloguj się
            </Button>
          </div>
        </div>
      </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={carouselStyle}>
            <img src={img2} alt="Drugi slajd" style={imageStyle} />
            <div style={contentWrapperStyle}>
            <div style={textStyle}>
              <h1 className="display-4 fw-bold">Znajdź Atrakcje, które Cię Inspirują</h1>
              <p className="lead">
                <b>
                Odkrywaj ukryte perełki i najpopularniejsze miejsca w swojej okolicy.
                Filtruj interesujące Cię lokalizacje – od zabytków, przez parki, po restauracje.
                </b>
              </p>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={carouselStyle}>
            <img src={img3} alt="Trzeci slajd" style={imageStyle} />
            <div style={contentWrapperStyle}>
              <h1 className="display-4 fw-bold">Twórz Trasy Dopasowane do Siebie</h1>
              <p className="lead">
              <b>
                Zaplanuj swoją podróż krok po kroku. Łącz ulubione miejsca w jedną trasę i
                odkrywaj świat na swoich zasadach.
                </b>
              </p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Sekcja funkcji */}
      <div style={{ backgroundColor: "#fff", padding: "40px 20px" }}>
  <Container className="mt-5">
    <h2 className="text-center mb-4">Twoje Możliwości</h2>  
    <Row className="gy-4">
      <Col xs={12} md={4} className="text-center">
        <div style={featureCardStyle}>
          <img
            src={icon1}
            alt="Mapa interaktywna"
            className="mb-3"
            style={featureIconStyle}
          />
          <h5>Twoje Miejsca na Mapie</h5>
          <p>
            Znajdź najlepsze atrakcje w Twojej okolicy lub na drugim końcu świata.
          </p>
          <Button as={Link}
              to="/map"
              variant="info"
              >Zobacz więcej</Button>
        </div>
      </Col>
      <Col xs={12} md={4} className="text-center">
        <div style={featureCardStyle}>
          <img
            src={icon2}
            alt="Planuj trasę"
            className="mb-3"
            style={featureIconStyle}
          />
          <h5>Planuj i Eksploruj</h5>
          <p>
            Stwórz idealną trasę podróży w kilku prostych krokach.
          </p>
          <Button as={Link}
              to="/map"
              variant="info"
              >Zobacz więcej</Button>
        </div>
      </Col>
      <Col xs={12} md={4} className="text-center">
        <div style={featureCardStyle}>
          <img
            src={icon3}
            alt="Opinie i oceny"
            className="mb-3"
            style={featureIconStyle}
          />
          <h5>Twoje Opinie Się Liczą</h5>
          <p>
            Podziel się opiniami i poznaj zdanie innych podróżników.
          </p>
          <Button as={Link}
          to="/points"
          variant="info">Zobacz więcej</Button>
        </div>
      </Col>
    </Row>
  </Container>
</div>
    </div>
  );
};

export default HomePage;
