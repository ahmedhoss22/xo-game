import Api from "@/config/api";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetcLevels } from "@/redux/slices/levels";

const LevelModal = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [intialState, setInitialState] = useState({
    number: 0,
    coins: 0,
    bg: "#000",
    color: "#fff",
  });

  const formik = useFormik({
    initialValues: intialState,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (update && data) {
      setInitialState(data);
      formik.setValues(data);
    }
  }, [update, data]);


  function handleSubmit(values) {
    const url = update ? "/level/update" : "/level";
    console.log(url);
    Api.post(url, values)
      .then(() => {
        notifySuccess("Data submitted");
        formik.handleReset();
        dispatch(fetcLevels());
        handleClose();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit} className="setting-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Level" : "Add new Level "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6}>
              <Form.Label htmlFor="number">Level number</Form.Label>
              <Form.Control
                type="number"
                value={formik?.values?.number}
                name="number"
                onChange={formik.handleChange}
                id="number"
                aria-describedby="number"
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="coins">Coins</Form.Label>
              <Form.Control
                type="number"
                id="coins"
                aria-describedby="coins"
                required
                value={formik?.values?.coins}
                name="coins"
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col xs={6}>
              <Form.Label htmlFor="bg">Background code</Form.Label>
              <Form.Control
                type="text"
                id="bg"
                aria-describedby="bg"
                value={formik?.values?.bg}
                name="bg"
                onChange={formik.handleChange}
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="color">Color code</Form.Label>
              <Form.Control
                type="text"
                id="colorCode"
                name="color"
                value={formik?.values?.color}
                onChange={formik.handleChange}
                aria-describedby="colorCode"
                required
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Label htmlFor="bgColor">Background color</Form.Label>
              <Form.Control
                type="color"
                id="bgColor"
                aria-describedby="bgColor"
                name="bg"
                value={formik?.values?.bg}
                onChange={formik.handleChange}
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="textColor">Color</Form.Label>
              <Form.Control
                type="color"
                id="textColor"
                name="color"
                value={formik?.values?.color}
                onChange={formik.handleChange}
                aria-describedby="textColor"
                required
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="close-btn"
          >
            Close
          </Button>
          <Button variant="primary" type="submit" className="save-btn">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LevelModal;
