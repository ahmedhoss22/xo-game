import Api from "@/config/api";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../toastify/toastify";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getAllItems } from "@/redux/slices/storeSlice";
import ticket from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import { useTranslation } from "react-i18next";


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
  const { t ,i18n} = useTranslation();
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
        <div className={`row ${i18n.language === "ar" ? 'rtl' : ''}`}>
            <h4 className="text-center">{t("changeStore.orderModel.confirmReplacement")}</h4>
            <div className={` ${i18n.language === "ar" ? 'rtl' : ''}`}>
              <h5 className="mt-3 mb-3">{t("changeStore.orderModel.productName")}{formik?.values?.name}</h5>
              <h5 className="d-flex mt-3 mb-3">
              {t("changeStore.orderModel.tokensDue")}                <div className="d-flex align-items-center justify-content-center gap-2">
                  {" "}
                  {formik?.values?.cost}
                  <img src={dollar.src} style={{width:'28px ', height:'28px'}} alt="" />{" "}
                </div>
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
                     {t("changeStore.orderModel.replace")} 
              </button>
              <button
                className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white "
                style={{ padding: " 0 50px" }}
                onClick={handleClose}
              >
                     {t("changeStore.orderModel.cancel")} 
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default OrderModel;
