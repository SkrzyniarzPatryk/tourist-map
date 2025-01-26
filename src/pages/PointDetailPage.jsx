import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { pointsService } from "../utils/api/pointsService";
import { commentsService } from "../utils/api/commentsService";
import "bootstrap-icons/font/bootstrap-icons.css";

const PointDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [point, setPoint] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ content: "", rating: 1 });
  const [galleryImages, setGalleryImages] = useState([]);

  const fetchPointDetails = async () => {
    try {
      const response = await pointsService.getPointById(id);
      const commentsResponse = await commentsService.getCommentsByPointId(id);

      // Simulated gallery
      const galleryMock = [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ];

      setPoint(response);
      setComments(commentsResponse);
      setGalleryImages(galleryMock);
      setFetchingStatus({ ...fetchingStatus, loading: false });
    } catch (err) {
      setFetchingStatus({
        ...fetchingStatus,
        loading: false,
        error: err.message,
      });
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Musisz być zalogowany, aby dodać opinię.");
      return;
    }

    try {
      const newCommentData = {
        pointId: id,
        userId: user.id,
        content: newComment.content,
        rating: newComment.rating,
      };
      const addedComment = await commentsService.addComment(newCommentData);
      setComments((prev) => [...prev, addedComment]);
      setNewComment({ content: "", rating: 1 }); // Resetowanie formularza
    } catch (err) {
      alert("Nie udało się dodać komentarza.");
    }
  };

  useEffect(() => {
    fetchPointDetails();
  }, []);

  if (fetchingStatus.loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (fetchingStatus.error) {
    return (
      <div className="text-center text-danger">
        <p>Błąd: {fetchingStatus.error}</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {/* Szczegóły punktu */}
      <Row>
        <Col md={8}>
          <h1>{point.name}</h1>
          <p>
            <i className="bi bi-geo-alt-fill text-primary"></i> {point.location}
          </p>
          <p>
            <i className="bi bi-tag-fill text-success"></i> Kategoria:{" "}
            {point.category}
          </p>
          <p>
            <i className="bi bi-star-fill text-warning"></i> Ocena:{" "}
            {point.rating}/5
          </p>
          <p>{point.description}</p>
        </Col>
        <Col md={4}>
          {/* Galeria zdjęć */}
          <h4>Galeria</h4>
          <Row>
            {galleryImages.map((image, index) => (
              <Col xs={6} key={index} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={image} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Recenzje */}
      <Row className="mt-4">
        <Col>
          <h2>Wszystkie Oceny i Recenzje</h2>
          {comments.map((comment) => (
            <Card key={comment.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>
                      <i className="bi bi-person-circle"></i> {comment.userId}
                    </strong>
                    <p>{comment.content}</p>
                  </div>
                  <div>
                    <span className="text-warning">
                      <i className="bi bi-star-fill"></i> {comment.rating}/5
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
          {comments.length === 0 && <p>Brak opinii dla tego miejsca.</p>}
        </Col>
      </Row>

      {/* Formularz dodawania opinii */}
      <Row className="mt-4">
        <Col>
          <h3>Napisz Recenzję</h3>
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="rating">
              <Form.Label>Oceń (0-5)</Form.Label>
              <Form.Control
                as="select"
                value={newComment.rating}
                onChange={(e) =>
                  setNewComment({ ...newComment, rating: e.target.value })
                }
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="content" className="mt-3">
              <Form.Label>Twoja Recenzja</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment.content}
                onChange={(e) =>
                  setNewComment({ ...newComment, content: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="primary">
              Opublikuj
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PointDetailPage;
