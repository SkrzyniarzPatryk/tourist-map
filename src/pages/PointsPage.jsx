import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { pointsService } from "../utils/api/pointsService";

const PointsPage = ({ pois }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);

  // const fetchPoints = async () => {
  //   try {
  //     const response = await fetch("/data/points.json"); // Pobiera dane z pliku JSON
  //     if (!response.ok) {
  //       throw new Error("Błąd podczas wczytywania danych");
  //     }
  //     const data = await response.json();
  //     setPoints(data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchPoints = async () => {
    try {
      const response = await pointsService.getAllPoints();
      setPoints(response);
      setFilteredPoints(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        <p>Błąd: {error}</p>
      </div>
    );
  }
  const filterPoints = () => {
    const minRating = document.getElementById("rating").value;
    setFilteredPoints(points.filter((point) => point.rating >= minRating));
  };

  return (
    <Container className="py-3" data-bs-theme="dark">
      {/* Sekcja filtrów */}
      <Row className="mb-4" style={{ color: "#fff" }}>
        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Label>Kategoria</Form.Label>
            <Form.Select>
              <option value="">Wszystkie</option>
              <option value="1">Muzea</option>
              <option value="2">Parki</option>
              <option value="3">Restauracje</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="rating">
            <Form.Label>Minimalna ocena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wpisz ocenę od 0 do 5"
              min="0"
              max="5"
              step="0.5"
            />
          </Form.Group>
        </Col>
        <Col xl={1} md={3} className="d-flex align-items-end">
          <Button variant="primary" className="w-100" onClick={filterPoints}>
            Filtruj
          </Button>
        </Col>
      </Row>

      {/* Pasek oddzielający */}
      <div
        style={{
          borderBottom: "2px solid #444",
          margin: "20px 30% 20px 0",
        }}
      ></div>

      {/* Sekcja z kartami */}
      <Row className="g-4">
        {filteredPoints.map((point) => (
          <Col md={4} key={point.id}>
            <Card className="h-100 text-white bg-dark border-secondary">
              <div className="position-relative">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                >
                  ❤ Dodaj do ulubionych
                </Button>
                <Card.Img
                  variant="top"
                  src={point.image}
                  alt={point.name}
                  style={{ borderRadius: "15px 15px 0 0" }}
                />
              </div>
              <Card.Body>
                <Card.Title>{point.name}</Card.Title>
                <Card.Text>{point.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="secondary">
                    <i className="bi bi-people"></i> {point.reviews} osób
                    pozytywnie oceniło
                  </Badge>
                  <Badge bg="info">
                    <i className="bi bi-star-fill"></i> {point.rating}/5
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PointsPage;
