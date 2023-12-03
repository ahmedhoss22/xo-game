"use client";
import "./message.scss";
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "@/components/footer/Footer";
import robot from "../../assets/photos/chatgpt.png";
import localFont from 'next/font/local';

const myFont = localFont({ src: '../../assets/fonts/Pacifico-Regular.ttf' });


const message = () => {
  function handleMessage(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    userName: Yup.string().required("برجاء ادخال الاسم"),
    email: Yup.string().required("برجاء ادخال الايميل"),
    message: Yup.string().required("برجاء ادخال الرساله")
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
    <>   <div className=" message">
      <div className="layer">
        <div className="container ">
          <div style={{marginBottom:'55px'}}>
          <div className="message-title" style={myFont.style}>
      <img src={robot.src} alt=""  />
      <div className="title-text d-flex"  >
        <span className="gray-color ms-3">Tic</span>
        <span className="purple-color ms-3">Tac</span>
        <span className="blue-color ms-3">Too</span>
      </div>
    </div>
          </div>

          <div className="row  d-flex align-items-center  " >
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="col-lg-6 responsive-input">
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
              </div>

              <div className="col-lg-6 responsive-input">
                {formik.touched.message && formik.errors.message ? (
                  <h4  >
                    {formik.errors.message}
                  </h4>
                ) : null}
              </div>

              <div className="position-relative d-flex align-items-center">
                <div className="input-with-icon  responsive-input ">
                  <textarea
                    type="message"
                    id="message"
                    name="message"
                    placeholder="اكتب الرسالة هنا"
                    className=" form-control  "
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
      <button
                type="submit"
                className="send-button btn responsive-input   text-center text-white mt-3 p-2 transform-btn"
              >
                أرسل{" "}
              </button>
          
            </form>
          </div>
        </div>
    <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    </div>    
    </>
 
  );
};

export default message;
