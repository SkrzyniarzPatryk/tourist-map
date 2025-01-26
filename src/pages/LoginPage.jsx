import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  ProgressBar,
} from "react-bootstrap";
import { userService } from "../utils/api/userService";
import { useAuth } from "../context/AuthProvider";

const LoginPage = ({ loginUser }) => {
  const { user, login, logout } = useAuth();

  const [status, setStatus] = useState({
    loading: false,
    status: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [userDataQuery, setUserDataQuery] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDataQuery({ ...userDataQuery, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      console.log("Rejestracja:", userDataQuery);
      if (userDataQuery.password !== userDataQuery.confirmPassword) {
        alert("Hasła muszą być identyczne!");
        return;
      }
    } else {
      setStatus({ ...status, status: "", loading: true });
      setTimeout(() => {
        handleLogin();
      }, 500);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await userService.login({
        username: userDataQuery.username,
        password: userDataQuery.password,
      });
      if (response) {
        login(response);
        loginUser(); ///do zmian
        setStatus({ ...status, status: "success", loading: true });
        // przekierowanie w App
      } else {
        setStatus({ ...status, status: "danger", loading: true });
        alert("Niepoprawne dane logowania!");
      }
    } catch (err) {
      setStatus({ ...status, status: "danger", loading: true });
      console.error("error", err);
    } finally {
      login(true);
      setTimeout(() => {
        setStatus({ ...status, loading: false });
      }, 2000);
    }
  };
  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      {status.loading && (
        <ProgressBar
          variant={status.status}
          animated
          now={100}
          style={{ borderRadius: "0", position: "fixed", width: "100%" }}
        />
      )}

      <Container
        data-bs-theme="dark"
        className="pt-5"
        style={{ maxWidth: "400px", color: "#fff" }}
      >
        <h3 className="text-center mb-4">
          {isRegistering ? "Rejestracja" : "Logowanie"}
        </h3>
        <Form onSubmit={handleSubmit}>
          {isRegistering ? (
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Adres e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Wprowadź e-mail"
                name="email"
                value={userDataQuery.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          ) : (
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Login użytkownika</Form.Label>
              <Form.Control
                type="login"
                placeholder="Wprowadź login"
                name="username"
                value={userDataQuery.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wprowadź hasło"
              name="password"
              value={userDataQuery.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {isRegistering && (
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Powtórz hasło"
                name="confirmPassword"
                value={userDataQuery.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="w-100">
            {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
            {/* <Spinner animation="border" size="xl" variant="info" /> */}
          </Button>
        </Form>
        <Row className="mt-3">
          <Col className="text-center">
            {isRegistering ? (
              <p>
                Masz już konto?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(false)}
                  className="p-0"
                >
                  Zaloguj się!
                </Button>
              </p>
            ) : (
              <p>
                Nie masz jeszcze konta?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(true)}
                  className="p-0"
                >
                  Zarejestruj się!
                </Button>
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
