import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Spinner } from "react-bootstrap";
import { pointsService } from "../utils/api/pointsService";

const PointDetailPage = ({}) => {
  const { id } = useParams();
  const { user } = useAuth();

  const [fetchingStatus, setFetchingStatus] = useState({
    loading: true,
    error: null,
  });
  const [point, setPoint] = useState({});

  const fetchPoints = async () => {
    try {
      const response = await pointsService.getPointById(id);
      setPoint(response[0]);
      setFetchingStatus({ ...fetchingStatus, loading: false });
    } catch (err) {
      setFetchingStatus({
        ...fetchingStatus,
        loading: false,
        error: err.message,
      });
    } finally {
      console.log(point);
    }
  };

  useEffect(() => {
    fetchPoints();
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
    <div style={{ color: "#fff" }}>
      <h1>Recenzje</h1>
      <p>{point}</p>
    </div>
  );
};
export default PointDetailPage;
