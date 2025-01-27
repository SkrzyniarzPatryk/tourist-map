import { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Form, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { userRoutesService } from "../../utils/api/userRoutesService";

const RouteCard = ({ routeDetails, userRouteList, setUserRouteList }) => {
  const { isUserLogged, user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRoutes, setUserRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newRouteName, setNewRouteName] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    const updateRoute = async () => {
      if (selectedRouteId && isUserLogged && user?.id) {
        try {
          setIsLoading(true);
          const routes = await userRoutesService.updateRoute(selectedRouteId, {
            routeList: userRouteList,
          });
        } catch (err) {
          setError("Nie udało się pobrać tras");
        } finally {
          setIsLoading(false);
        }
      }
    };
    updateRoute();
  }, [userRouteList]);

  const handleRouteSelect = async (routeId) => {
    try {
      setIsLoading(true);
      if (routeId) {
        const route = await userRoutesService.getRouteById(routeId);
        setUserRouteList(route.routeList);
      } else {
        setUserRouteList([]);
      }
      setSelectedRouteId(routeId);
    } catch (err) {
      setError("Nie udało się załadować trasy");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewRoute = async () => {
    if (!newRouteName.trim()) {
      setError("Nazwa trasy nie może być pusta");
      return;
    }

    try {
      setIsLoading(true);
      const newRoute = await userRoutesService.createRoute({
        name: newRouteName,
        userId: user.id,
        routeList: [],
      });
      setUserRoutes([...userRoutes, newRoute]);
      setNewRouteName("");
    } catch (err) {
      setError("Nie udało się utworzyć nowej trasy");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovePoint = (index, direction) => {
    const newList = [...userRouteList];
    if (direction === "up" && index > 0) {
      [newList[index], newList[index - 1]] = [
        newList[index - 1],
        newList[index],
      ];
    } else if (direction === "down" && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [
        newList[index + 1],
        newList[index],
      ];
    }
    setUserRouteList(newList);
  };

  const handleRemovePoint = (index) => {
    const newList = userRouteList.filter((_, i) => i !== index);
    setUserRouteList(newList);
  };

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
        {/* Dodawanie nowej trasy */}
        <Form.Group className="mb-3">
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Nazwa nowej trasy"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
            />
            <Button
              variant="light"
              className="ms-2"
              onClick={handleAddNewRoute}
              disabled={isLoading}
            >
              Dodaj
            </Button>
          </div>
        </Form.Group>

        {/* Wybór istniejącej trasy */}
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
            <div>
              <Button
                variant="link"
                className="text-light p-1"
                onClick={() => handleMovePoint(index, "up")}
                disabled={index === 0}
              >
                <i className="bi bi-arrow-up"></i>
              </Button>
              <Button
                variant="link"
                className="text-light p-1"
                onClick={() => handleMovePoint(index, "down")}
                disabled={index === userRouteList.length - 1}
              >
                <i className="bi bi-arrow-down"></i>
              </Button>
              <Button
                variant="link"
                className="text-light p-1"
                onClick={() => handleRemovePoint(index)}
              >
                <i className="bi bi-trash"></i>
              </Button>
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
