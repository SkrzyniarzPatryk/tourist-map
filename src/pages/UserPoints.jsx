import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { pointsService } from "../utils/api/pointsService";
import PointCardComponent from "../components/PointsPageComponents/PointCardComponent";
import { useAuth } from "../context/AuthProvider";

const UserService = () => {
  const { user } = useAuth(); // Pobierz dane użytkownika
  const [favoritePoints, setFavoritePoints] = useState([]); // Ulubione punkty użytkownika


  const fetchFavoritePoints = async () => {
    if (!user || !user.favoritePoints) {
      return; // Jeśli użytkownik nie jest zalogowany lub nie ma ulubionych punktów, zakończ funkcję
    }

    try {
      // Pobierz wszystkie punkty z API
      const allPoints = await pointsService.getAllPoints();
      // Filtruj punkty na podstawie favoritePoints użytkownika
      const userFavorites = allPoints.filter((point) =>
        user.favoritePoints.includes(point.id.toString()) // Konwersja ID na string, jeśli potrzebne
      );
      setFavoritePoints(userFavorites);
    } catch (err) {
      console.error("Błąd podczas pobierania ulubionych punktów:", err);
    }
  };

  // Efekt do pobierania ulubionych punktów po zalogowaniu użytkownika
  useEffect(() => {
    fetchFavoritePoints();
  }, [user]);

  // Wyświetlanie listy ulubionych punktów
  return (
    <Container className="py-3" data-bs-theme="dark">
      <Row className="g-4">
        {favoritePoints.map((point) => (
          <Col md={4} key={point.id}>
            <PointCardComponent point={point} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserService;