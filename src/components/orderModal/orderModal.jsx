import Api from "@/config/api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getAllItems } from "@/redux/slices/storeSlice";
import { Typography } from "@mui/material";
import ticket from "@/assets/photos/Ticket.png";
import { FaArrowLeft } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 410,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const OrderModel = ({ open, handleClose, data }) => {
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
    if (data) {
      setInitialState(data);
      formik.setValues(data);
    }
  }, [data]);

  function handleSubmit() {
    const url = "/order";
    console.log(data);
    Api.post(url, { product: data._id })
      .then(() => {
        notifySuccess("Rechange is submitted");
        formik.resetForm();
        dispatch(getAllItems());
        handleClose();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }

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
            <h4 className="text-center">هل تريد تأكيد أستبدال هذا المنتج ؟</h4>
            <div className="rtl">
                          <h5 className="mt-3 mb-3" >أسم المنتج : {formik?.values?.name}</h5>
  <h5   className="d-flex mt-3 mb-3">عدد التوكنز المستحقة :
 <div className="d-flex align-items-center justify-content-center gap-2"> {formik?.values?.cost}<img src={ticket.src} alt="" /> </div> 
   </h5>
            </div>

            {formik.values.image && typeof formik.values.image === "string" && (
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={apiUrl + formik.values.image}
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
                أستبدال
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

export default OrderModel;
