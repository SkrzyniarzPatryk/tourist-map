import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Spinner,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { pointsService } from "../utils/api/pointsService";
import Paginator from "../components/PointsPageComponents/Paginator";

const PointsPage = ({ pois }) => {
  const [pointsWitchDescr, setPointsWitchDescr] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [paginatedSortedQuery, setPaginatedSortedQuery] = useState({
    page: 1,
    pageSize: 6,
    sortBy: "rating",
    sortOrder: "desc",
  });

  // let sortedQuery = {
  //   sortBy: "rating",
  //   sortOrder: "desc",
  // };

  const fetchPoints = async () => {
    // console.log(fetchingStatus);
    // console.log(paginatedSortedQuery);
    try {
      const response =
        await pointsService.getPaginatedPagePoints(paginatedSortedQuery);
      setPointsWitchDescr(response);
    } catch (err) {
      setFetchingStatus({ ...fetchingStatus, error: err.message });
    } finally {
      setFetchingStatus({ ...fetchingStatus, loading: false });
    }
  };
  const changePage = (page, perPage) => {
    if (perPage) setPaginatedSortedQuery({ page: page, pageSize: perPage });
    else setPaginatedSortedQuery({ ...paginatedSortedQuery, page: page });
  };

  useEffect(() => {
    fetchPoints();
  }, [paginatedSortedQuery]);

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
  const filterPoints = () => {
    const minRating = document.getElementById("rating").value;
    fetchPoints();
    // console.log(fetchingStatus);
  };

  return (
    <Container className="py-3" data-bs-theme="dark">
      {/* Sekcja filtrów */}
      <Row className="mb-4" style={{ color: "#fff" }}>
        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Label>Kategoria</Form.Label>
            <Form.Select
              onChange={(e) =>
                setPaginatedSortedQuery({
                  ...paginatedSortedQuery,
                  pageSize: e.target.value,
                })
              }
            >
              <option value="">Wszystkie</option>
              <option value="1">Muzea</option>
              <option value="2">Parki</option>
              <option value="3">Restauracje</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="rating">
            <Form.Label>Minimalna ocena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wpisz ocenę od 0 do 5"
              min="0"
              max="5"
              step="0.5"
            />
          </Form.Group>
        </Col>
        <Col xl={1} md={3} className="d-flex align-items-end">
          <Button variant="primary" className="w-100" onClick={filterPoints}>
            Filtruj
          </Button>
        </Col>
      </Row>

      {/* Pasek oddzielający */}
      <div
        style={{
          borderBottom: "2px solid #444",
          margin: "20px 30% 20px 0",
        }}
      ></div>

      {/* Sekcja z kartami */}
      <Row className="g-4">
        {pointsWitchDescr.data.map((point) => (
          <Col md={4} key={point.id}>
            <Card className="h-100 text-white bg-dark border-secondary">
              <div className="position-relative">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                >
                  ❤ Dodaj do ulubionych
                </Button>
                <Card.Img
                  variant="top"
                  src={point.image}
                  alt={point.name}
                  style={{ borderRadius: "15px 15px 0 0" }}
                />
              </div>
              <Card.Body>
                <Card.Title>{point.name}</Card.Title>
                <Card.Text>{point.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="secondary">
                    <i className="bi bi-people"></i> {point.reviews} osób
                    pozytywnie oceniło
                  </Badge>
                  <Badge bg="info">
                    <i className="bi bi-star-fill"></i> {point.rating}/5
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Paginator pointsData={points} /> */}
      <Row>
        <Col>
          <Pagination className="justify-content-center mt-4">
            <Form.Select
              value={paginatedSortedQuery.pageSize}
              style={{
                width: "150px",
                borderRadius:
                  "var(--bs-border-radius) 0 0 var(--bs-border-radius)",
                backgroundColor: "var(--bs-pagination-bg)",
              }}
              onChange={(e) => changePage(1, e.target.value)}
            >
              {[3, 6, 9].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} na stronę
                </option>
              ))}
            </Form.Select>
            <Pagination.First
              disabled={pointsWitchDescr.prev === null}
              onClick={() => changePage(pointsWitchDescr.first)}
            />
            <Pagination.Prev
              disabled={pointsWitchDescr.prev === null}
              onClick={() =>
                pointsWitchDescr.prev && changePage(pointsWitchDescr.prev)
              }
            />
            {Array.from({ length: pointsWitchDescr.pages }, (_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={paginatedSortedQuery.page === idx + 1}
                onClick={() => changePage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={pointsWitchDescr.next === null}
              onClick={() =>
                pointsWitchDescr.next && changePage(pointsWitchDescr.next)
              }
            />
            <Pagination.Last
              disabled={pointsWitchDescr.next === null}
              onClick={() => changePage(pointsWitchDescr.last)}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default PointsPage;
