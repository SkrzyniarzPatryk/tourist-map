import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
//import PointsService from "../services/PointsService"; // Adjust import as needed

import { useEffect } from "react";
import SelectImagesModal from "./SelectImagesModal";
import { pointsService } from "../../utils/api/pointsService";
import { formToJSON } from "axios";
import { category } from "../../models/Category";
import { useAuth } from "../../context/AuthProvider";

const AddPointModal = ({ showModal, handleCloseModal, pointPosition }) => {
  const { user, isUserLogged } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const onSubmit = async (data) => {
    if (!isUserLogged) {
      alert("Musisz być zalogowany, aby dodać punkt");
      return;
    }
    let formatedData = {
      name: data.name,
      description: data.description,
      category: data.category,
      position: [data.lat, data.lng],
      images: selectedImages,
      userId: user.id,
    };

    try {
      const response = await pointsService.addPoint(formatedData);
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    console.log("AddPointModal mounted", showModal, pointPosition);
    return () => {
      console.log("AddPointModal unmounted");
    };
  }, [pointPosition]);

  const closeImageModal = () => {
    setShowImageModal(false);
  };
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj punkt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Nazwa punktu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wprowadź nazwę"
              {...register("name", { required: "Nazwa jest wymagana" })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Kategoria</Form.Label>
            <Form.Select
              type="select"
              placeholder="Wprowadź nazwę"
              {...register("category", { required: "Kategoria jest wymagana" })}
              isInvalid={!!errors.category}
            >
              {category.list.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Wprowadź opis"
              {...register("description", { required: "Opis jest wymagany" })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="formLatitude">
                <Form.Label>Szerokość geograficzna</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="50.88677"
                  value={pointPosition?.lat}
                  {...register("lat", { required: "Szerokość jest wymagana" })}
                  isInvalid={!!errors.lat}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLongitude">
                <Form.Label>Długość geograficzna</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="20.58803"
                  value={pointPosition?.lng}
                  {...register("lng", { required: "Długość jest wymagana" })}
                  isInvalid={!!errors.lng}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lng?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formImages" className="mt-3">
            <Form.Label>Wybrane zdjęcia</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {selectedImages?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Selected ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "3px solid blue",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setSelectedImages((prev) =>
                      prev.filter((item) => item !== img),
                    )
                  }
                />
              ))}
            </div>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => setShowImageModal(true)}
            >
              Dodaj zdjęcie
            </Button>
            <SelectImagesModal
              showImageModal={showImageModal}
              closeImageModal={closeImageModal}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zamknij
          </Button>
          <Button variant="primary" type="submit">
            Dodaj
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddPointModal;
