'use client'
import "./login.scss";
import emailIcon from "../../assets/photos/email-icon.png";
import passwordIcon from "../../assets/photos/password-icon.png";
import gIcon from "../../assets/photos/google-icon.png";
import { BiLogoFacebook } from "react-icons/bi";
import country from "../../assets/photos/country-flag.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChooseLanguage from "@/components/chooseLanguage/Chooselanguage";

const login = () => {
  function handleLogin(values) {
    console.log(values);
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="login-bg">
<div className="col-lg-2 col-7  mb-10">
           <ChooseLanguage />

          </div>
      <div className="login m-2 ">
        <form
          className="  col-lg-3 col-md-6  col-11 form-shape shadow"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-center text-white mt-1   "> تسجيل الدخول</h1>
          <div className="row  d-flex align-content-center justify-content-center m-4 ">
            <div className="col-12 gy-4">
              {formik.touched.email && formik.errors.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}
              <div className="input-with-icon">
                <input
                  className="form-control input-color"
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="الايميل"
                  required
                />
                <img src={emailIcon.src} className="icon" alt="" />
              </div>
            </div>
            <div className="col-12 gy-4">
              {formik.touched.password && formik.errors.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : null}
              <div className="input-with-icon ">
                <input
                  className="form-control input-color"
                  type="text"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="كلمة السر "
                  required
                />
                <img src={passwordIcon.src} className="icon" alt="" />
              </div>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn form-control border-radius-20  green-bg text-white mt-4 btn-padding transform-btn"
              >
                انشاء حساب
              </button>
            </div>
            <div className="col-12  ">
              <p className="text-center  text-white mt-4 mb-4 middle-line ">
                
                 أنشأ 
                 {/* حسابك عن طريق  */}
              </p>
               

            </div>
            <div className="col-12 d-flex  mb-20 justify-content-between ">
              <div className="col-5 d-flex blue-bg   border-radius-20 align-items-center justify-content-center p-1 transform-btn pointer">
                <button className="btn form-control text-white">
                  facebook
                </button>
                <BiLogoFacebook className=" fs-1   text-white" />
              </div>

              <div className="col-5 d-flex white-bg p-1 border-radius-20 align-items-center justify-content-center transform-btn pointer">
                <button className="btn form-control">Google</button>
                <img src={gIcon.src} className="" alt="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
