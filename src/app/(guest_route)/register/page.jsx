"use client";
import "./register.scss";
import userIcon from "@/assets/photos/user-icon.png";
import emailIcon from "@/assets/photos/email-icon.png";
import passwordIcon from "@/assets/photos/password-icon.png"; 
import Link from "next/link";
import { useFormik } from "formik"; 
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useRouter } from "next/navigation"; 
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import { useTranslation } from "react-i18next";
import { registerValidationSchema } from "@/utils/validation";
import { useState } from "react";


const register = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation();
  const [loadingBtn, setLoadingBtn] = useState(false);


  function handleRegister(values) {
    setLoadingBtn(true);

    Api.post("/auth/register",values)
    .then(()=>{
        notifySuccess("Account created !!")
        router.push("/home")
    })
    .catch((err)=>{
      setLoadingBtn(false);

      let errMsg = err?.response?.data?.message
      notifyError(Array.isArray(errMsg)? errMsg[0]:errMsg )
      console.log(err);
    })
    .finally(() => {
      setLoadingBtn(false);
    });
  }


  function googleRegister(){
    location.href=process.env.NEXT_PUBLIC_API_SERVER+"/api/auth/google/login"
  }
  function facebookRegister(){
    location.href=process.env.NEXT_PUBLIC_API_SERVER+"/api/auth/facebook/login"
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      rePassword: "",
    },
    validationSchema:registerValidationSchema,
    onSubmit: handleRegister,
  });
  return (
    <div className="register-bg" dir={i18n.language === 'ar'&&'rtl' }>
      <div className=" d-flex align-items-center justify-content-between container mt-4">

<div className="col-lg-2 col-md-3 col-6 ">
          <Link href={"/login"} className="text-decoration-none">
            <div className="register-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
              <button className="text-white"> {t("login.title")}</button>
            </div>
          </Link>
      
        </div>
    <div>
           <ChooseLanguage />
        </div>
        </div>
        <div className="d-flex align-items-center justify-content-center rtl mt-1  container">
      <div className="register  m-2 w-full max-w-sm">
      <form className="shadow-md rounded px-8 pt-6 pb-6 mb-2 border-radius-20"
            style={{ background: "var(--purple-color)"  }}

          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-center text-white mt-1   "> {t("register.title")}</h1>
          <div className="row  d-flex align-content-center justify-content-center m-4 ">

       
            <div className="ltr col-12 gy-3 "> 
  <input 
    type="text" 
    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name="name"
    placeholder={t("register.name")}
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required 
  />
  {formik.touched.name && formik.errors.name && (
    <div className="invalid-feedback">
      {formik.errors.name}
    </div>
  )}
            </div>    
            
            
            <div className="ltr col-12 gy-3 ">
            <input 
    type="text" 
    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name="phone"
    placeholder={t("register.phone")}
    value={formik.values.phone}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required 
  />
  {formik.touched.phone && formik.errors.phone && (
    <div className="invalid-feedback">
      {formik.errors.phone}
    </div>
  )}
            </div> 
            <div className="ltr col-12 gy-3">
            <input 
    type="text" 
    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name="email"
    placeholder={t("register.email")}
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required 
  />
  {formik.touched.email && formik.errors.email && (
    <div className="invalid-feedback">
      {formik.errors.email}
    </div>
  )}
            </div>
            <div className="ltr col-12 gy-3">
            <input 
    type="text" 
    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name="password"
    placeholder={t("register.password")}
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required 
  />
  {formik.touched.password && formik.errors.password && (
    <div className="invalid-feedback">
      {formik.errors.password}
    </div>
  )}
            </div>
            <div className="ltr col-12 gy-3">
            <input 
    type="text" 
    className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`} 
    id="validationServer03" 
    aria-describedby="validationServer03Feedback" 
    name="rePassword"
    placeholder={t("register.rePassword")}
    value={formik.values.rePassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    required 
  />
  {formik.touched.rePassword && formik.errors.rePassword && (
    <div className="invalid-feedback">
      {formik.errors.rePassword}
    </div>
  )}
            </div>
            <div className="col-12 w-75 m-auto ">
              <button
                type="submit"
                disabled={
                  !formik.isValid ||
                  (Object.keys(formik.touched).length === 0 &&
                    formik.touched.constructor === Object)
                }
                className="btn form-control border-radius-20  green-bg text-white mt-4 transform-btn"
              >
                      {loadingBtn ? (
                    <div
                      className="spinner-border text-light "
                      role="status"
                    >
                      <span className="visually-hidden"  >Loading...</span>
                    </div>
                  ) : (
                    t("register.title")
                  )}
</button>
            </div>

            {/* <div className="col-12">
              <p className="text-center text-white middle-line ">
                أنشأ حسابك 
              </p>
            </div>
            <div className="col-12 d-flex  justify-content-between ">
              <div onClick={facebookRegister} className="col-5 d-flex blue-bg   border-radius-20 align-items-center justify-content-center p-1 transform-btn pointer">
                <button className="btn form-control text-white facebook-btn" type="button" >
                  Facebook
                </button>
                <BiLogoFacebook className=" fs-1   text-white" />
              </div>

              <div onClick={googleRegister} className="col-5 d-flex white-bg p-1 border-radius-20 align-items-center justify-content-center transform-btn pointer">
                <button className="btn form-control google-btn" type="button" >
                  Google
                </button>
                <img src={gIcon.src} className="" alt="" />
              </div>
            </div> */}

          </div>
        </form>
      </div>  </div>
      
    </div>
  );
};

export default register;