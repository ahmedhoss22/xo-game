import Api from "@/config/api";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";

const PlayingCoinsModal = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [intialState, setInitialState] = useState({
    rounds: 0,
    coins: 0,
    winCoins: 0,
    name:""
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
    const url = update ? "/playing-coins/update" : "/playing-coins";
    Api.post(url, values)
      .then(() => {
        notifySuccess("Data submitted");
        formik.handleReset();
        dispatch(fetchPlayingCoins());
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
            {update ? "تعديل على نقاط اللعب" : "اضافة نقاط لعب"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          <Col xs={6}>
              <Form.Label htmlFor="name">الاسم</Form.Label>
              <Form.Control
                type="text"
                value={formik?.values?.name}
                name="name"
                onChange={formik.handleChange}
                id="name"
                aria-describedby="name"
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="number">نقاط الدخول</Form.Label>
              <Form.Control
                type="number"
                value={formik?.values?.coins}
                name="coins"
                onChange={formik.handleChange}
                id="number"
                aria-describedby="number"
                required
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col xs={6}>
              <Form.Label htmlFor="coins">نقاط الفوز</Form.Label>
              <Form.Control
                type="number"
                id="coins"
                aria-describedby="number"
                required
                value={formik?.values?.winCoins}
                name="winCoins"
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="numer">عدد الجولات</Form.Label>
              <Form.Control
                type="number"
                id="rounds"
                aria-describedby="rounds"
                value={formik?.values?.rounds}
                name="rounds"
                onChange={formik.handleChange}
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

export default PlayingCoinsModal;
