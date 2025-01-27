import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { pointsService } from "../utils/api/pointsService";
import { commentsService } from "../utils/api/CommentsService";
import "bootstrap-icons/font/bootstrap-icons.css";
import { category } from '../models/Category';

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
  const [showAllComments, setShowAllComments] = useState(false);

  const fetchPointDetails = async () => {
    try {
      const response = await pointsService.getPointById(id);
      const commentsResponse = await commentsService.getCommentsByPointId(id);
      setPoint(response[0]);
      setComments(commentsResponse);
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
            username: user.username,
            content: newComment.content,
            rating: newComment.rating,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Dodaj nowy komentarz
        const response = await commentsService.addComment(newCommentData);
        
        if (!response) {
            throw new Error("Nie udało się dodać komentarza");
        }

        // Pobierz zaktualizowaną listę komentarzy
        const updatedCommentsResponse = await commentsService.getCommentsByPointId(id);
        setComments(updatedCommentsResponse);

        // Oblicz nową średnią ocenę
        const totalRating = updatedCommentsResponse.reduce((sum, comment) => sum + Number(comment.rating), 0);
        const newAverageRating = Number((totalRating / updatedCommentsResponse.length).toFixed(1));

        // Zaktualizuj punkt w bazie danych
        await pointsService.updatePointRating(id, newAverageRating, updatedCommentsResponse.length);

        // Zaktualizuj lokalny stan punktu
        setPoint(prev => ({
            ...prev,
            rating: newAverageRating,
            reviews: updatedCommentsResponse.length
        }));

        // Wyczyść formularz
        setNewComment({ content: "", rating: 1 });
        

    } catch (err) {
        alert("Nie udało się dodać komentarza: " + err.message);
        console.error(err);
    }
};

  useEffect(() => {
    fetchPointDetails();
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce((sum, comment) => sum + Number(comment.rating), 0);
      const newAverageRating = Number((totalRating / comments.length).toFixed(1));
      
      setPoint(prev => ({
        ...prev,
        rating: newAverageRating,
        reviews: comments.length
      }));
    }
  }, [comments]);

  if (fetchingStatus.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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

  const imageStyle = {
    width: "1200px",
    height: "500px",
    objectFit: "cover",
  };

  // Sortowanie komentarzy po dacie
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <Container className="pt-4">
      {/* Sekcja nagłówka i karuzeli */}
      <Row>
        <Col>
          <h1 className="text-white text-center mb-4">{point.name}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          {point.images && point.images.length > 0 ? (
            <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
              <Carousel>
                {point.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Zdjęcie ${index + 1}`}
                      style={imageStyle}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          ) : (
            <p className="text-white">Brak zdjęć dla tego punktu.</p>
          )}
        </Col>
      </Row>

      {/* Sekcja informacji */}
      <Row md={8}>
  <div className="mt-4 p-4 border rounded bg-dark text-white">
    <p>
      <i className="bi bi-tag-fill text-success"></i> Kategoria: {
        category.list.find(cat => cat.id === parseInt(point.category))?.name || 'Nieznana kategoria'
      }
    </p>
    <p>
      <i className="bi bi-star-fill text-warning"></i> Ocena: {point.rating}/5
      <small className="ms-2">
        ({point.reviews} {point.reviews === 1 ? 'opinia' : 
          point.reviews < 5 ? 'opinie' : 'opinii'})
      </small>
    </p>
    <p>
      <i className="bi bi-info-circle-fill text-info"></i> {point.description}
    </p>
  </div>
</Row>

      {/* Separator */}
      <Row className="justify-content-center my-5">
        <Col md={10}>
          <hr className="bg-light" style={{ height: '2px' }} />
        </Col>
      </Row>

      {/* Sekcja recenzji */}
<Row className="justify-content-center">
  <Col md={10}>
    <h2 className="text-white text-center mb-4">Wszystkie Oceny i Recenzje</h2>
    
    <div className="p-4 border rounded" style={{ backgroundColor: '#2b2b2b' }}> {/* Ciemniejsze tło dla kontenera */}
      {sortedComments.slice(0, showAllComments ? sortedComments.length : 3).map((comment) => (
        <Card key={comment.id} className="mb-3" style={{ backgroundColor: '#343a40' }}> {/* Szare tło dla karty */}
          <Card.Body>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <strong className="me-3 text-light"> {/* Jasny tekst */}
                    <i className="bi bi-person-circle me-2"></i>
                    {comment.userId}
                  </strong>
                  <span className="text-warning">
                    <i className="bi bi-star-fill"></i> {comment.rating}/5
                  </span>
                </div>
              </div>
              <small className="text-light opacity-75 d-block mb-2"> {/* Jaśniejszy tekst dla daty */}
                {comment.createdAt 
                  ? new Date(comment.createdAt).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Data niedostępna'}
              </small>
              <p className="mb-0 text-light">{comment.content}</p> {/* Jasny tekst dla treści */}
            </div>
          </Card.Body>
        </Card>
      ))}
      
      {sortedComments.length === 0 && (
        <p className="text-white">Brak opinii dla tego miejsca.</p>
      )}

      {sortedComments.length > 3 && !showAllComments && (
        <div className="text-center mt-3">
          <Button 
            variant="outline-light" 
            onClick={() => setShowAllComments(true)}
          >
            Pokaż więcej komentarzy
          </Button>
        </div>
      )}
    </div>
  </Col>
</Row>

{/* Formularz dodawania opinii */}
<Row className="justify-content-center mt-5">
  <Col md={10}>
    <div className="p-4 border rounded" style={{ backgroundColor: '#2b2b2b' }}> {/* Ciemniejsze tło dla formularza */}
      <h3 className="text-white text-center mb-4">Napisz Recenzję</h3>
      <Form onSubmit={handleAddComment}>
      <Form.Group controlId="rating">
  <Form.Label className="text-white">Oceń (1.0-5.0)</Form.Label>
  <Form.Control
    type="number"
    step="0.1"
    min="1"
    max="5"
    placeholder="Wpisz ocenę od 1 do 5"
    value={newComment.rating}
    onChange={(e) => {
      const inputValue = e.target.value;
      if (inputValue === '') {
        setNewComment({ ...newComment, rating: '' });
        return;
      }

      let value = parseFloat(inputValue);
      if (!isNaN(value)) {
        // Konwertuj wprowadzone cyfry na format X.X
        if (inputValue.length === 2 && !inputValue.includes('.')) {
          value = parseFloat(inputValue[0] + '.' + inputValue[1]);
        }
        
        // Ogranicz do zakresu 1-5
        value = Math.min(Math.max(value, 1), 5);
        // Ogranicz do jednego miejsca po przecinku
        value = Math.round(value * 10) / 10;
        setNewComment({ ...newComment, rating: value });
      }
    }}
    style={{ 
      backgroundColor: '#343a40', 
      color: 'white', 
      border: '1px solid #495057',
      width: '150px'
    }}
  />
  <Form.Text className="text-light">
    Możesz wpisać ocenę z dokładnością do jednego miejsca po przecinku (np. 4.5)
  </Form.Text>
        </Form.Group>

        <Form.Group controlId="content" className="mt-4">
          <Form.Label className="text-white">Twoja Recenzja</Form.Label>
          <Form.Control
              as="textarea"
              rows={4}
              placeholder="Podziel się swoją opinią..."
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              style={{ 
                backgroundColor: '#343a40', 
                color: 'white', 
                border: '1px solid #495057'
              }}
              className="custom-textarea" // dodajemy klasę
            />
        </Form.Group>

        <div className="text-center mt-4">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            style={{ minWidth: '200px' }}
          >
            Opublikuj
          </Button>
        </div>
      </Form>
    </div>
  </Col>
</Row>

<Row className="justify-content-center pt-5">
    <Col md={10}>
      <hr className="pt-light" style={{ height: '2px' }} />
    </Col>
  </Row>
    </Container>
  );
};

export default PointDetailPage;