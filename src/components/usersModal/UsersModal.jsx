import Api from "@/config/api";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAllUsesrData } from "@/redux/slices/user";

const UsersModal = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [intialState, setIntialState] = useState({
    email: "",
    coins: 0,
    password: "",
    name: "",
  });

  useEffect(() => {
    if (update) setIntialState(data);
    formik.setValues(data);
  }, [update, data]);

  function handleSubmit(values) {
    const url = update ? "/users/user/update" : "/users/user";
    console.log(values);
    Api.post(url, values)
      .then(() => {
        notifySuccess("Data submitted");
        formik.handleReset();
        dispatch(fetchAllUsesrData());
        handleClose();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }


  const formik = useFormik({
    initialValues: intialState,
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit} className="setting-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "تعديل بيانات مستخدم" : "اضافة مستخدم"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6}>
              <Form.Label htmlFor="number">البريد الالكتروني</Form.Label>
              <Form.Control
                type="email"
                value={formik?.values?.email}
                name="email"
                onChange={formik.handleChange}
                id="number"
                aria-describedby="number"
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="password">كلمة السر</Form.Label>
              <Form.Control
                type="password"
                id="password"
                aria-describedby="number"
                required
                value={formik?.values?.password}
                name="password"
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col xs={6}>
              <Form.Label htmlFor="numer">الاسم</Form.Label>
              <Form.Control
                type="text"
                id="color"
                value={formik?.values?.name}
                name="name"
                onChange={formik.handleChange}
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label htmlFor="numer">الكوينز</Form.Label>
              <Form.Control
                type="number"
                id="color"
                aria-describedby="color"
                value={formik?.values?.coins}
                name="coins"
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

export default UsersModal;
