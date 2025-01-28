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
import PointCardComponent from "../components/PointsPageComponents/PointCardComponent";
import { category } from "../models/Category";

const PointsPage = ({ pois }) => {
  const [pointsWitchDescr, setPointsWitchDescr] = useState([]);
  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [paginatedSortedQuery, setPaginatedSortedQuery] = useState({
    page: 1,
    pageSize: 6,
    category: "",
    minRating: 0,
  });

  const fetchPoints = async () => {
    try {
      const response =
        await pointsService.getPaginatedPagePoints(paginatedSortedQuery);
      setPointsWitchDescr(response);
      setFetchingStatus({ ...fetchingStatus, loading: false });
    } catch (err) {
      setFetchingStatus({
        ...fetchingStatus,
        loading: false,
        error: err.message,
      });
    } finally {
    }
  };
  const changePage = (page, perPage) => {
    if (perPage)
      setPaginatedSortedQuery({
        ...paginatedSortedQuery,
        page: page,
        pageSize: perPage,
      });
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
                  category: e.target.value,
                })
              }
            >
              <option value="">Wszystkie</option>
              {category.list.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="rating">
            <Form.Label>Minimalna ocena</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wpisz ocenę od 0 do 5"
              min="1"
              max="5"
              step="1"
              onChange={(e) =>
                setPaginatedSortedQuery({
                  ...paginatedSortedQuery,
                  minRating: e.target.value,
                })
              }
            />
          </Form.Group>
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
        {pointsWitchDescr.data?.map((point) => (
          <Col md={4} key={point.id}>
            <PointCardComponent point={point} />
          </Col>
        ))}
      </Row>

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
