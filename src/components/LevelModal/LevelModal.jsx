import Api from "@/config/api";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetcLevels } from "@/redux/slices/levels";

const LevelModal = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [intialState , setIntialState] = useState({
    number: 0,
    coins: 0,
    bg: "",
    color: "",
  })

  useEffect(()=>{
    if(update) setIntialState(data)
    formik.setValues(data)
  },[update, data])

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
  const formik = useFormik({
    initialValues: intialState,
    onSubmit: handleSubmit,
  });


return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Level" : "Add new Level "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Form.Label htmlFor="coins">Coins</Form.Label>
          <Form.Control
            type="number"
            id="coins"
            aria-describedby="number"
            required
            value={formik?.values?.coins}
            name="coins"
            onChange={formik.handleChange}
          />
          <Form.Label htmlFor="numer">color</Form.Label>
          <Form.Control
            type="color"
            id="color"
            value={formik?.values?.color}
            name="color"
            onChange={formik.handleChange}
            aria-describedby="color"
            required
          />
          <Form.Control
            type="text"
            id="color"
            value={formik?.values?.color}
            name="color"
            onChange={formik.handleChange}
            aria-describedby="color"
            required
          />
          <Form.Label htmlFor="numer">Background color</Form.Label>
          <Form.Control
            type="color"
            id="color"
            aria-describedby="color"
            value={formik?.values?.bg}
            name="bg"
            onChange={formik.handleChange}
            required
          />
          <Form.Control
            type="text"
            id="color"
            aria-describedby="color"
            value={formik?.values?.bg}
            name="bg"
            onChange={formik.handleChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LevelModal;
