import Api from "@/config/api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useDispatch } from "react-redux";
import { fetchAllUsesrData } from "@/redux/slices/user";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material"; 

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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {" "}
        <form onSubmit={formik.handleSubmit}>
          <div className="row rtl ">
            <h2 className="text-center">
              {" "}
              {update ? "تعديل بيانات مستخدم" : "اضافة مستخدم"}
            </h2>
            {formik.touched.name && formik.errors.name ? (
              <h4>{formik.errors.name}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="name"
              name="name"
              value={formik?.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="الأسم"
              variant="outlined"
            />
            {formik.touched.email && formik.errors.email ? (
              <h4>{formik.errors.email}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="email"
              name="email"
              value={formik?.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="الأيميل"
              variant="outlined"
            />
            {formik.touched.password && formik.errors.password ? (
              <h4>{formik.errors.password}</h4>
            ) : null}
            <TextField
              className="mb-4"
              type="password"
              id="password"
              name="password"
              value={formik?.values?.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="رقم السر"
              variant="outlined"
            />
            {formik.touched.coins && formik.errors.coins ? (
              <h4>{formik.errors.coins}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="coins"
              name="coins"
              value={formik?.values?.coins}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="المحفظة "
              variant="outlined"
            />
            <div className="d-flex">
              
            </div>
  
            <div className="d-flex align-items-center justify-content-between"> <button
              type="submit"
              className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white  "
              style={{padding:' 0 50px'}}
            >
                      {update ? "تعديل " : "أنشاء  "}
      
            </button>
            <button
              className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white "
              style={{padding:' 0 50px'}}
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
