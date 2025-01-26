import { Badge, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const PointCardComponent = ({ point }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 text-white bg-dark border-secondary">
      <div className="position-relative">
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
            <i className="bi bi-people"></i> {point.reviews || 0} recenzji
          </Badge>
          <Badge bg="info">
            <i className="bi bi-star-fill"></i> {point.rating || 0}/5
          </Badge>
        </div>
        <div className="mt-3 d-flex justify-content-between">

        
        </div>
      </Card.Body>
    </Card>
  );
};

export default PointCardComponent;
