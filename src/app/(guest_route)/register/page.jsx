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


const register = () => {
  const router = useRouter()
  const { t } = useTranslation();

  function handleRegister(values) {
    Api.post("/auth/register",values)
    .then(()=>{
        notifySuccess("Account created !!")
        router.push("/home")
    })
    .catch((err)=>{
      let errMsg = err?.response?.data?.message
      notifyError(Array.isArray(errMsg)? errMsg[0]:errMsg )
      console.log(err);
    })
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
      rePassword: "",
    },
    registerValidationSchema,
    onSubmit: handleRegister,
  });
  return (
    <div className="register-bg">
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
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 border-radius-20"
            style={{ background: "var(--purple-color)"  }}

          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-center text-white mt-1   "> {t("register.title")}</h1>
          <div className="row  d-flex align-content-center justify-content-center m-4 ">
            <div className="ltr col-12 gy-4 ">
              {formik.touched.name && formik.errors.name ? (
                <h6 className="text-white">{formik.errors.name}</h6>
              ) : null}
              <div className="input-with-icon ">
                <input
                  className="form-control input-color"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("register.name")}
                  required 
                />
                <img src={userIcon.src} className="icon " alt="" />
              </div>
            </div>{" "}
            <div className="ltr col-12 gy-4">
              {formik.touched.email && formik.errors.email ? (
                <h6 className="text-white">{formik.errors.email}</h6>
              ) : null}
              <div className="input-with-icon">
                <input
                  className="form-control input-color"
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("register.email")}
                  required
                />
                <img src={emailIcon.src} className="icon" alt="" />
              </div>
            </div>
            <div className="ltr col-12 gy-4">
              {formik.touched.password && formik.errors.password ? (
                <h6 className="text-white">
                  {formik.errors.password}
                </h6>
              ) : null}
              <div className="input-with-icon ">
                <input
                  className="form-control input-color"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder= {t("register.password")}
                  required
                />
                <img src={passwordIcon.src} className="icon" alt="" />
              </div>
            </div>
            <div className="ltr col-12 gy-4">
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <h6 className="text-white">
                  {formik.errors.rePassword}
                </h6>
              ) : null}
              <div className="input-with-icon ">
                <input
                  className="form-control input-color"
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  autoComplete="off"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("register.rePassword")}
                  required
                />
                <img src={passwordIcon.src} className="icon" alt="" />
              </div>
            </div>
            <div className="col-12 w-75 m-auto mb-4">
              <button
                type="submit"
                className="btn form-control border-radius-20  green-bg text-white mt-4 transform-btn"
              >
{t("register.title")}              </button>
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