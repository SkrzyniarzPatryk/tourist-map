import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import { userService } from "../../utils/api/userService";

const PointCardComponent = ({ point }) => {
  const { user, isUserLogged } = useAuth();
  const navigate = useNavigate();

  const [userFavorite, setUserFavorite] = useState([]);

  const fetchFavoritePoints = async () => {
    if (isUserLogged && user?.id) {
      const userData = await userService.getUserById(user.id);
      setUserFavorite(userData.favoritePoints);
    }
  };

  useEffect(() => {
    fetchFavoritePoints();
  }, []);

  useEffect(() => {
    console.log(userFavorite);
    if (user?.id && userFavorite.length > 0) {
      userService.updateProfile(user.id, {
        favoritePoints: userFavorite,
      });
    }
  }, [userFavorite]);

  return (
    <Card className="h-100 text-white bg-dark border-secondary">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={point.images[0]}
          alt={point.name}
          style={{
            borderRadius: "15px 15px 0 0",
            height: "200px",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title>{point.name}</Card.Title>
        <Card.Text
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {point.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Badge bg="secondary">
            <i className="bi bi-people"></i> {point.reviews || 0} recenzji
          </Badge>
          <Badge bg="info">
            <i className="bi bi-star-fill"></i> {point.rating || 0}/5
          </Badge>
        </div>
        <div className="mt-3 d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={() => navigate(`/point/${point.id}`)}
          >
            Zobacz Opinie
          </Button>
          {isUserLogged && (
            <>
              {userFavorite.includes(point.id) ? (
                <Button
                  variant="secondary"
                  onClick={() =>
                    setUserFavorite((prev) =>
                      prev.filter((id) => id !== point.id),
                    )
                  }
                >
                  <i className="bi bi-heart-fill"></i>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setUserFavorite((prev) => [...prev, point.id])}
                >
                  <i className="bi bi-heart"></i>
                </Button>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PointCardComponent;
