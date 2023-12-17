'use client'
import "./store.scss";
import money from "../../../assets/photos/money-bag.png";
import xo from "../../../assets/photos/xo.png";
import tickets from "../../../assets/photos/Ticket.png";
import { useState } from "react";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";

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



const store = () => {  
   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleEditTicket(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    editTicket: Yup.number().required("برجاء تعديل التوكنز    ."),
  });

  let formik = useFormik({
    initialValues: { 
      editTicket: 0,
    },
    validationSchema,
    onSubmit: handleEditTicket,
  });

  return (
    <div className="store rtl">
      <div className="container">
        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      التوكينز{" "}
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <button className="fw-bold transform-btn ">
                        اضافة مستوي
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                 
                                             <div className="d-flex align-items-center justify-content-center">

                        <div className="col-md-3 prize ">
              <div className="img-container">
                <img src={tickets.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            </div>
                      <div className="delete-update-btn d-flex justify-content-between m-auto ">
                        <button className="edit-btn fw-bold transform-btn "    onClick={handleOpen}>
                          تعديل
                        </button>
                        <button className="delete-btn fw-bold transform-btn ">
                          حذف
                        </button>
                      </div>{" "}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  "></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
           <Box sx={style}>      <form onSubmit={formik.handleSubmit}>

          <div className="row  rtl">
            <h2 className="text-center">تعديل التوكنز </h2>

            {formik.touched.privacy && formik.errors.privacy ? (
                    <h4>{formik.errors.privacy}</h4>
                  ) : null}
            
            <TextField
              className="mb-4"
              type="number"
              id="ticket"
              label="التوكنز"
              variant="outlined"
            />
        
        
        <button type="submit" className="  fw-bold transform-btn  green-bg pt-2 pb-2 text-white ">تعديل</button>
          </div>      </form>
        </Box>
      </Modal>
    </div>
  );
};

export default store;
