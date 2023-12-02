"use client";
import "./message.scss";
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";

const message = () => {
  function handleMessage(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required"),
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
    <div className=" message">
      <div className="layer">
        <div className="container ">
          <Title/>
        
          <div className="row  d-flex align-items-center  ">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="col-lg-6 responsive-input">
                {" "}
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="alert alert-danger">
                    {formik.errors.userName}
                  </div>
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
                  <div className="alert alert-danger">
                    {formik.errors.email}
                  </div>
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
                  <div className="alert alert-danger">
                    {formik.errors.message}
                  </div>
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
                className="send-button btn responsive-input   text-center text-white mt-4  p-2 transform-btn"
              >
                أرسل{" "}
              </button>
            </form>
          </div> 
        </div>
        <div className=''>
   <Footer/>
        </div>
     
      </div> 
    
    </div>
  );
};

export default message;
