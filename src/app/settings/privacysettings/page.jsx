'use client'
import "./privacySettings.scss";
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

const privacySettings = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handlePrivacy(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    privacy: Yup.string().required("برجاء ادخال رساله سياسة الخصوصية ."),
  });

  let formik = useFormik({
    initialValues: { 
      privacy: "",
    },
    validationSchema,
    onSubmit: handlePrivacy,
  });


  return (
    <div className="privacy-settings rtl">
      <div className="container">

      <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                   سياسة الخصوصية
                    </th>

                  
 
                    <th scope="col" className="px-6 py-3">
                    <button className="fw-bold transform-btn "                           onClick={handleOpen}
>اضغط للتعديل </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    <div className=" content col-lg-12  d-flex align-items-center justify-content-around  text-white mb-4 ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
              delectus consequatur aliquid, fugiat, ratione eligendi vero
              tempora quasi exercitationem et eius. Recusandae voluptatem nemo
              amet numquam optio, aliquid quia esse nihil at velit neque tenetur
              magnam assumenda aut nobis incidunt ad illo earum? Laboriosam,
              temporibus fugiat. Odio adipisci quibusdam quae tempora natus quis
              fugit magnam ipsa velit numquam quia cum doloremque, repellat
              magni accusantium nobis dolorem qui, quas autem expedita
              repudiandae vero necessitatibus! Ad alias laborum nisi incidunt
              dignissimos reiciendis numquam placeat obcaecati aliquam deleniti,
              quas provident eius vero reprehenderit? Quidem, dolorem dolore
              deserunt eveniet illum odit voluptate iure repellendus!
            </p>
          </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
              
                    </td>
                   
                   
                   
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
            <h2 className="text-center">تعديل سياسة الخصوصية</h2>
  {formik.touched.privacy && formik.errors.privacy ? (
                    <h4>{formik.errors.privacy}</h4>
                  ) : null}
            
            <TextField
              className="mb-4"
              id="privacy"
              name="privacy"
              value={formik.values.privacy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}             
              label="سياسة التخوصية"
              variant="outlined"
            />
        
        <div className="d-flex align-items-center justify-content-between"> <button
              type="submit"
              className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white  "
              style={{padding:' 0 50px'}}
            >
تعديل      
            </button>
            <button
              className="  fw-bold transform-btn model-btn pt-2 pb-2 text-white "

style={{padding:' 0 50px'}}              onClick={handleClose}
            >
              الغاء
            </button>

           
            </div>          </div>      </form>
        </Box>
      </Modal>

 
    </div>
  );
};

export default privacySettings;
