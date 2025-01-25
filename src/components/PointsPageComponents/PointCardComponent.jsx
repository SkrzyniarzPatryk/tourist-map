import { Badge, Button, Card } from "react-bootstrap";

const PointCardComponent = ({ point }) => {
  return (
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
          src={point.images[0]}
          alt={point.name}
          style={{ borderRadius: "15px 15px 0 0" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{point.name}</Card.Title>
        <Card.Text>{point.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Badge bg="secondary">
            <i className="bi bi-people"></i> {point.reviews} osób pozytywnie
            oceniło
          </Badge>
          <Badge bg="info">
            <i className="bi bi-star-fill"></i> {point.rating}/5
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};
export default PointCardComponent;
