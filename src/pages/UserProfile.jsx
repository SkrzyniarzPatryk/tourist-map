import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import usserAccountLogo from "../assets/user_icon.png";
import { useAuth } from "../context/AuthProvider";
import { commentsService } from "../utils/api/CommentsService";
import { pointsService } from "../utils/api/pointsService";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { isUserLogged, user } = useAuth();
  const [commentsAmount, setCommentsAmount] = useState(0);
  const [pointsAmount, setPointsAmount] = useState(0);

  const [password, setPassword] = useState("••••••••");

  useEffect(() => {
    if (isUserLogged) {
      getCommentsAmount();
      getPointsAmount();
    }
  }, []);

  useEffect(() => {
    console.log("isUserLogged", isUserLogged);
    if (!isUserLogged) {
      navigate("/home");
    }
  }, [isUserLogged, navigate]);

  const getCommentsAmount = async () => {
    try {
      const response = await commentsService.getCommentsByUserId(user.id);
      setCommentsAmount(response.length);
    } catch (error) {
      console.error(error);
    }
  };
  const getPointsAmount = async () => {
    try {
      const response = await pointsService.getPointsByUserId(user.id);
      setPointsAmount(response.length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="min-vh-100 bg-dark text-light py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="bg-secondary text-light shadow-lg">
            <Card.Body>
              <Row className="align-items-center mb-4">
                <Col xs="auto">
                  <div
                    className="bg-dark border border-dashed rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img
                      src={usserAccountLogo}
                      alt="User Avatar"
                      width="80"
                      height="80"
                      className="rounded-circle me-2"
                      style={{ margin: "10px" }}
                    />
                  </div>
                </Col>
                <Col>
                  <h1 className="h4 d-flex align-items-center gap-2">
                    <i
                      style={{ fontSize: "30px" }}
                      className="bi bi-person-badge"
                    ></i>
                    {user?.username}
                  </h1>
                  <p className="text-muted d-flex align-items-center gap-2">
                    <i
                      style={{
                        fontSize: "30px",
                        color: "#ddd",
                      }}
                      className="bi bi-envelope"
                    ></i>
                    {user?.email}
                  </p>
                </Col>
              </Row>

              <hr className="border-light" />
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i style={{ fontSize: "30px" }} className="bi bi-lock"></i>
                    Hasło jest bezpieczne
                  </h5>
                  <Button variant="link" disabled className="text-info p-0">
                    <i
                      style={{ fontSize: "30px" }}
                      className="bi bi-pencil"
                    ></i>{" "}
                    Zmien hasło
                  </Button>
                </div>

                <div className="p-3 bg-dark rounded text-monospace">
                  {password}
                </div>
              </div>
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col md={6}>
              <Card className="bg-secondary text-light">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-circle text-light">
                    <i
                      style={{ fontSize: "40px", padding: "0 7px" }}
                      className="bi bi-graph-up"
                    ></i>
                  </div>
                  <div>
                    <p className="mb-1 text-muted">Dodane punkty</p>
                    <h5 className="mb-0">{pointsAmount}</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-secondary text-light">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-circle text-light">
                    <i
                      style={{ fontSize: "40px", padding: "0 6px" }}
                      className="bi bi-chat-dots"
                    ></i>
                  </div>
                  <div>
                    <p className="mb-1 text-muted">Dodane komentarze</p>
                    <h5 className="mb-0">{commentsAmount}</h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;
