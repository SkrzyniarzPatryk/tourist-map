import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { pointsService } from "../utils/api/pointsService";
import PointCardComponent from "../components/PointsPageComponents/PointCardComponent";
import { useAuth } from "../context/AuthProvider";

const UserService = () => {
  const { user } = useAuth();
  const [userPoints, setUserPoints] = useState([]);

  const fetchFavoritePoints = async () => {
    if (!user) {
      return;
    }

    try {
      const allUserPoints = await pointsService.getPointsByUserId(user.id);
      setUserPoints(allUserPoints);
    } catch (err) {
      console.error("Błąd podczas pobierania punktów:", err);
    }
  };

  useEffect(() => {
    fetchFavoritePoints();
  }, [user]);

  return (
    <Container className="py-3" data-bs-theme="dark">
      <Row className="g-4">
        {userPoints.map((point) => (
          <Col md={4} key={point.id}>
            <PointCardComponent point={point} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserService;
