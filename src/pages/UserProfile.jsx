import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import usserAccountLogo from "../assets/user_icon.png";
import { useAuth } from "../context/AuthProvider";
import { commentsService } from "../utils/api/commentsService";
import { pointsService } from "../utils/api/pointsService";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentsService } from "../utils/api/paymentsService"; // Dodaj import
import { userService } from "../utils/api/userService";
const UserProfile = () => {
  const navigate = useNavigate();
  const { isUserLogged, user, login } = useAuth();
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [commentsAmount, setCommentsAmount] = useState(0);
  const [pointsAmount, setPointsAmount] = useState(0);

  const [showPremium, setShowPremium] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [failureToken, setFailureToken] = useState("");
  const [password, setPassword] = useState("••••••••");

  useEffect(() => {
    if (isUserLogged) {
      getCommentsAmount();
      getPointsAmount();
      setIsUserPremium(user?.isPremium || false);
    }
  }, []);

  useEffect(() => {
    console.log("isUserLogged", isUserLogged);
    if (!isUserLogged) {
      navigate("/home");
    }
  }, [isUserLogged, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("status") === "success") {
      const payPalId = params.get("token");
      if (payPalId) {
        setShowProcessing(true);
        setShowPremium(false);
        checkPaymentStatus(payPalId);
      }
    }
    if (params.get("status") === "failure") {
      const token = params.get("token");
      setFailureToken(token || "");
      setShowFailure(true);
      setShowPremium(false);
      setShowProcessing(false);
    }
  }, [location.search]);

  const checkPaymentStatus = async (payPalId) => {
    console.log("PayPal ID:", payPalId);
    let tries = 0;
    const maxTries = 10;
    const interval = setInterval(async () => {
      tries++;
      try {
        const result = await paymentsService.checkPaymentStatus(payPalId);
        if (result.transactionStatus === "confirmed") {
          clearInterval(interval);
          setPaymentConfirmed(true);

          console.log(result);

          // Aktualizacja statusu użytkownika na Premium
          try {
            const result = await userService.googleLoginConfirm();
            if (result) {
              console.log(result);
              login(result);
              setIsUserPremium(true);
            }
          } catch (error) {
            console.error(
              "Błąd podczas aktualizacji statusu użytkownika:",
              error,
            );
          }

          setTimeout(() => setShowProcessing(false), 2000);
        }
      } catch (e) {
        console.error("Błąd sprawdzania statusu płatności:", e);
      }
      if (tries >= maxTries) {
        clearInterval(interval);
        setShowProcessing(false);
        setShowFailure(true);
      }
    }, 2000);
  };

  const handleStartPayment = async () => {
    try {
      const response = await paymentsService.startPayment({
        ProductName: "PREMIUM",
      });
      if (response) {
        console.log(response.approvalUrl);
        window.location.href = response.approvalUrl;
      }
    } catch (e) {
      alert("Błąd inicjowania płatności");
    }
  };

  const getCommentsAmount = async () => {
    try {
      // const response = await commentsService.getCommentsByUserId(user.id);
      // setCommentsAmount(response.length);
    } catch (error) {
      console.error(error);
    }
  };
  const getPointsAmount = async () => {
    try {
      // const response = await pointsService.getPointsByUserId(user.id);
      // setPointsAmount(response.length);
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
          <Row className="mt-4">
            <div className="d-flex justify-content-center mt-0">
              <Button
                variant="warning"
                className="d-flex align-items-center gap-2 px-4 py-2 shadow"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  borderRadius: "30px",
                }}
                disabled={isUserPremium}
                onClick={() => setShowPremium(true)}
              >
                <i
                  className="bi bi-star-fill"
                  style={{ fontSize: "1.5rem" }}
                ></i>
                {isUserPremium ? "Masz konto Premium" : "Zostań Premium"}
              </Button>
            </div>

            {/* MODAL PREMIUM */}
            <Modal
              show={showPremium}
              onHide={() => setShowPremium(false)}
              centered
              contentClassName="bg-dark text-light"
            >
              <Modal.Header closeButton closeVariant="white">
                <Modal.Title>
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Konto Premium
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className="mb-3">Dlaczego warto?</h5>
                <ul>
                  <li>Brak reklam</li>
                  <li>Dostęp do ekskluzywnych punktów i tras</li>
                  <li>Priorytetowe wsparcie</li>
                  <li>Specjalna odznaka przy profilu</li>
                </ul>
                <div className="text-center mt-4">
                  <Button
                    variant="warning"
                    size="lg"
                    className="d-flex align-items-center gap-2 px-4 py-2"
                    style={{ fontWeight: "bold", borderRadius: "30px" }}
                    onClick={handleStartPayment}
                    disabled={isUserPremium}
                  >
                    <i className="bi bi-credit-card-2-front-fill"></i>
                    Zapłać 19,99 zł
                  </Button>
                </div>
              </Modal.Body>
            </Modal>

            {/* MODAL PRZETWARZANIA */}
            <Modal
              show={showProcessing}
              onHide={() => setShowProcessing(false)}
              centered
              contentClassName="bg-dark text-light"
            >
              <Modal.Header>
                <Modal.Title>
                  <i className="bi bi-credit-card-2-front-fill text-warning me-2"></i>
                  Przetwarzanie płatności
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                {!paymentConfirmed ? (
                  <>
                    <Spinner
                      animation="border"
                      variant="warning"
                      className="mb-3"
                    />
                    <div>Trwa potwierdzanie płatności...</div>
                  </>
                ) : (
                  <>
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                    <div className="mt-3">
                      Płatność potwierdzona! Dziękujemy za wsparcie.
                    </div>
                  </>
                )}
              </Modal.Body>
            </Modal>
            <Modal
              show={showFailure}
              onHide={() => setShowFailure(false)}
              centered
              contentClassName="bg-dark text-light"
            >
              <Modal.Header closeButton closeVariant="white">
                <Modal.Title>
                  <i className="bi bi-x-circle-fill text-danger me-2"></i>
                  Niepowodzenie płatności
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <p>
                  Niestety nie udało się potwierdzić płatności.
                  <br />
                  Jeśli środki zostały pobrane, skontaktuj się z administratorem
                  i podaj ten identyfikator:
                </p>
                <div className="bg-secondary rounded p-2 my-3 text-break">
                  <strong>{failureToken}</strong>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowFailure(false)}
                >
                  Zamknij
                </Button>
              </Modal.Body>
            </Modal>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;
