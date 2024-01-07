import Api from "@/config/api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import  { getAllItems } from "@/redux/slices/coinStoreSlice";

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

const CoinStoreModel = ({ open, handleClose, update, data }) => {
  const dispatch = useDispatch();
  const [initialState, setInitialState] = useState({
    coins: "",
    price: "", 
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
   

    const url = update ? "/coin-store/update" : "/coin-store";
    console.log(values);
    Api.post(url, values )
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
              {update ? "تعديل  الكوينز" : "اضافة كوينز"}
            </h4>
            {formik.touched.price && formik.errors.price ? (
              <h4>{formik.errors.price}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="price"
              name="price"
              type="number"
              value={formik?.values?.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="السعر"
              variant="outlined"
            />
            {formik.touched.coins && formik.errors.coins ? (
              <h4>{formik.errors.coins}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="coins"
              type="number"
              name="coins"
              value={formik?.values?.coins}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="عدد الكوينز"
              variant="outlined"
            />
 

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

export default CoinStoreModel;
