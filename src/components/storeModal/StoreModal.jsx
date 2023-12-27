import Api from "@/config/api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import { getAllItems } from "@/redux/slices/storeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const UsersModal = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState({
    cost: "",
    name: "",
    image: null,
  });
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (update && data) {
      setInitialState(data);
      formik.setValues(data);
    }
  }, [update, data]);

  function handleSubmit(values) {
   

    const url = update ? "/store/update" : "/store";
    console.log(values);
    Api.post(url, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        notifySuccess("Data submitted");
        formik.resetForm();
        dispatch(getAllItems());
        handleClose();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="row rtl ">
            <h4 className="text-center">
              {update ? "تعديل بيانات منتج" : "اضافة منتج"}
            </h4>
            {formik.touched.name && formik.errors.name ? (
              <h4>{formik.errors.name}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="name"
              name="name"
              value={formik?.values?.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="أسم المنتج"
              variant="outlined"
            />
            {formik.touched.cost && formik.errors.cost ? (
              <h4>{formik.errors.cost}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="cost"
              name="cost"
              value={formik?.values?.cost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="عدد الكوينز"
              variant="outlined"
            />
            {formik.touched.image && formik.errors.image ? (
              <h4>{formik.errors.image}</h4>
            ) : null}
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image" className="text-center">
              <Button
                component="span"
                className="mb-4"
                variant="outlined"
                style={{ textTransform: "none" }}
              >
                اختيار صورة المنتج
              </Button>
            </label>
            {formik.values.image && formik.values.image instanceof File && (
  <div className="d-flex align-items-center justify-content-center">
    <img
      src={URL.createObjectURL(formik.values.image)}
      alt="Product"
      style={{
        width: "200px",
        height: "200px",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />
  </div>
)}

{formik.values.image && typeof formik.values.image === 'string' && (
  <div className="d-flex align-items-center justify-content-center">
    <img
      src={apiUrl+formik.values.image}
      alt="Product"
      style={{
        width: "200px",
        height: "200px",
        marginTop: "5px",
        marginBottom: "10px",
      }}
    />
  </div>
)}


            <div className="d-flex align-items-center justify-content-between">
              {" "}
              <button
                type="submit"
                className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white  "
                style={{ padding: " 0 50px" }}
              >
                {update ? "تعديل " : "أنشاء  "}
              </button>
              <button
                className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white "
                style={{ padding: " 0 50px" }}
                onClick={handleClose}
              >
                الغاء
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default UsersModal;
