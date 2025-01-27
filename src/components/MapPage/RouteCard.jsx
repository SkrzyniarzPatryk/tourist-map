import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Form, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { userRoutesService } from "../../utils/api/userRoutesService";
import { Routes } from "react-router-dom";

const RouteCard = ({ routeDetails, userRouteList, setUserRouteList }) => {
  const { isUserLogged, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRoutes, setUserRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    console.log(routeDetails);

    const fetchUserRoutes = async () => {
      if (isUserLogged && user?.id) {
        try {
          setIsLoading(true);
          const routes = await userRoutesService.getUserRoutes(user.id);
          setUserRoutes(routes);
        } catch (err) {
          setError("Nie udało się pobrać tras");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserRoutes();
  }, []);

  const handleRouteSelect = async (routeId) => {
    try {
      setIsLoading(true);
      const route = await userRoutesService.getRouteById(routeId);
      console.log(route);
      setUserRouteList(route.routeList);
      setSelectedRouteId(routeId);
    } catch (err) {
      setError("Nie udało się załadować trasy");
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {}, [routeDetails]);

  // Jeśli użytkownik nie jest zalogowany, nie wyświetlaj komponentu
  if (!isUserLogged) {
    return null;
  }

  if (isMinimized) {
    return (
      <Button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
        }}
        variant="dark"
        onClick={() => setIsMinimized(false)}
      >
        <i className="bi bi-map"></i>
      </Button>
    );
  }

  return (
    <Card
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        width: "300px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        maxHeight: "80vh",
        overflow: "auto",
      }}
      bg="dark"
      text="light"
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-dark">
        <div className="d-flex align-items-center">
          <i className="bi bi-map me-2" style={{ fontSize: "1.25rem" }}></i>
          <h5 className="mb-0">Plan trasy</h5>
        </div>
        <div>
          <Button
            variant="link"
            className="text-light p-0 me-2"
            onClick={() => setIsMinimized(true)}
          >
            <i className="bi bi-dash"></i>
          </Button>
          <Button variant="link" className="text-light p-0">
            <i className="bi bi-x-lg" style={{ fontSize: "1.5rem" }}></i>
          </Button>
        </div>
      </Card.Header>

      <Card.Body className="p-2">
        <Form.Group className="mb-3">
          <Form.Select
            value={selectedRouteId || ""}
            onChange={(e) => handleRouteSelect(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Wybierz trasę</option>
            {userRoutes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedRouteId && (
          <div className="d-flex justify-content-between mb-3">
            <span>
              {routeDetails.distance} km | {Math.round(routeDetails.time)} min
            </span>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => {
                setSelectedRouteId(null);
                setUserRouteList([]);
              }}
            >
              Wyłącz trasę
            </Button>
          </div>
        )}
      </Card.Body>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <ListGroup variant="flush">
        {userRouteList.map((point, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex align-items-center justify-content-between bg-dark text-light"
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt me-2"></i>
              <span>{point.name}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {userRouteList.length === 0 && (
        <Card.Body className="text-center text-light">
          Brak punktów trasy
        </Card.Body>
      )}

      {isLoading && (
        <div className="text-center p-2">
          <Spinner animation="border" variant="light" size="sm" />
        </div>
      )}
    </Card>
  );
};
export default RouteCard;
