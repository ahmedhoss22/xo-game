"use client";
import "./message.scss";
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "@/components/footer/Footer";
import robot from "../../../assets/photos/chatgpt.png";
import whatsApp from "../../../assets/photos/whatsAppp.png";
import localFont from "next/font/local";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { textVariants } from "@/utils/animation";
const myFont = localFont({ src: "../../../assets/fonts/Pacifico-Regular.ttf" });
 

const message = () => {
  function handleMessage(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    userName: Yup.string().required("برجاء ادخال الاسم"),
    email: Yup.string().required("برجاء ادخال الايميل"),
    message: Yup.string().required("برجاء ادخال الرساله"),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleMessage,
  });

  return (
    <>
 
      <div className=" message">
        
        <div className="layer d-flex flex-column ">
      <div className="flex-grow"> 
          <div className="container ">

            <motion.div style={{ marginBottom: "55px" }}>
              <motion.div className="message-title"    
              variants={textVariants}
              initial={"initial"}
              animate={"animate"} 
              style={myFont.style}>
                <motion.img src={robot.src} alt=""  variants={textVariants} />
                <motion.div className="title-text d-flex"  variants={textVariants}>
                  <motion.span className="gray-color ms-3"  variants={textVariants}>Tic</motion.span>
                  <motion.span className="purple-color ms-3"  variants={textVariants}>Tac</motion.span>
                  <motion.span className="blue-color ms-3"  variants={textVariants}>Too</motion.span>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="row  d-flex align-items-center  ">
              <form action="" onSubmit={formik.handleSubmit}>
                {/* <div className="col-lg-6 responsive-input">
                {" "}
                {formik.touched.userName && formik.errors.userName ? (
                  <h4>
                    {formik.errors.userName}
                  </h4>
                ) : null}
              </div>

              <div className="position-relative d-flex align-items-center mb-3">
                <div className="input-with-icon responsive-input">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="أسم المستخدم"
                    className="form-control"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FaUserAlt className="icon primary-color" />
                </div>
              </div>

              <div className="col-lg-6 responsive-input">
                {formik.touched.email && formik.errors.email ? (
                  <h4 >
                    {formik.errors.email}
                  </h4>
                ) : null}
              </div>

              <div className="position-relative d-flex align-items-center mb-3">
                <div className="input-with-icon  responsive-input ">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="الأيميل"
                    className=" form-control  "
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FaUserAlt className="icon primary-color" />
                </div>
              </div> */}

                <div className="col-lg-6 responsive-input">
                  {formik.touched.message && formik.errors.message ? (
                    <h4>{formik.errors.message}</h4>
                  ) : null}
                </div>

                <div className="position-relative d-flex align-items-center">
                  <div className="input-with-icon  responsive-input ">
                    <textarea
                      type="text"
                    
                      placeholder="Type message here .........."
                      className=" form-control ltr "  
                      id="message"
                      name="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                {/* <button
                  type="submit"
                  className="send-button btn responsive-input   text-center text-white mt-3 p-2 transform-btn"
                >
                  أرسل{" "}
                </button> */}
                <div className="whatsApp-container mt-4 shadow pointer white-container justify-center">
            <img src={whatsApp.src} className="whatsApp mb-3" alt="whatsApp" />
            <h5>Send Message</h5>
          </div>
                {/* <Button
                  variant="outlined"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                >
                  أرسل
                </Button> */}
              </form>
            </div>
          </div>          </div>

            <Footer />
        </div>
      </div>
    </>
  );
};

export default message;
