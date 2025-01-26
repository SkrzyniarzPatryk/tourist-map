import React, { useState } from "react";
import { Modal, Form, Button, ListGroup, Image } from "react-bootstrap";

const SelectImagesModal = ({
  showImageModal,
  closeImageModal,
  selectedImages,
  setSelectedImages,
}) => {
  const [images, setImages] = useState([
    "/exampleImages/Bialy_Kosciol.jpg",
    "/exampleImages/centruma.jpg",
    "/exampleImages/Malnia.jpeg",
  ]);
  const [customImageUrl, setCustomImageUrl] = useState("");
  return (
    <Modal show={showImageModal} onHide={closeImageModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Wybierz zdjęcia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div key={index} className="position-relative">
              <img
                src={img}
                alt={`Option ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: selectedImages.includes(img)
                    ? "3px solid blue"
                    : "1px solid gray",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedImages((prev) =>
                    prev.includes(img)
                      ? prev.filter((item) => item !== img)
                      : [...prev, img],
                  )
                }
              />
              {selectedImages.includes(img) && (
                <div
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
        <Form.Group controlId="formCustomImage" className="mt-3">
          <Form.Label>Lub wklej link do nowego zdjęcia</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="https://example.com/image.jpg"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
            />
            <Button
              variant="primary"
              className="ms-2"
              onClick={() => {
                if (customImageUrl) {
                  setSelectedImages((prev) => [...prev, customImageUrl]);
                  setImages((prev) => [...prev, customImageUrl]);
                  setCustomImageUrl("");
                }
              }}
            >
              Dodaj
            </Button>
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeImageModal}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SelectImagesModal;
