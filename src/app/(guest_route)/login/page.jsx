"use client";
import "./login.scss";
import emailIcon from "@/assets/photos/email-icon.png";
import passwordIcon from "@/assets/photos/password-icon.png";
import gIcon from "@/assets/photos/google-icon.png";
import { BiLogoFacebook } from "react-icons/bi";
import Link from "next/link";
import { useFormik } from "formik";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { onlineUser } from "@/redux/slices/user";
import { useTranslation } from "react-i18next";
import { loginValidationSchema } from "@/utils/validation";
import { useState } from "react";

const login = () => {
  const { t, i18n } = useTranslation();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  function handleLogin(values) {
    setLoadingBtn(true);
    Api.post("/auth/login", values)
      .then(() => {
        dispatch(onlineUser());
        notifySuccess("Welcome!!");
        router.push("/");
      })
      .catch((err) => {
        setLoadingBtn(false);
        let errMsg = err?.response?.data?.message;
        notifyError(Array.isArray(errMsg) ? errMsg[0] : errMsg);
        console.log(err);
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema, // Corrected property name
    onSubmit: handleLogin,
  });

  function googleRegister() {
    router.push(process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/google/login");
  }
  function facebookRegister() {
    location.href =
      process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/facebook/login";
  }

  return (
    <div className="login-bg"  dir={i18n.language === 'ar'&&'rtl' }>
      <div className=" d-flex align-items-center justify-content-between container mt-4">
        <div className="col-lg-2 col-md-3 col-6 ">
          <Link href={"/register"} className="text-decoration-none">
            <div className="login-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
              <button className="text-white"> {t("register.title")}</button>
            </div>
          </Link>
        </div>
        <div>
          {" "}
          <ChooseLanguage />
        </div>
      </div>
      <div
        className={`d-flex align-items-center justify-content-center   container${
          i18n.language === "ar" ? "rtl" : ""
        }  `}
      >
        <div className="login m-2 w-full max-w-sm">
          <form
            className="shadow-md rounded px-8 pt-6 pb-8 border-radius-20"
            style={{ background: "var(--purple-color)" }}
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-center text-white   ">
              {" "}
              {t("login.title")}
            </h1>
            <div className="row  d-flex align-content-center justify-content-center m-4 ">
              <div className="col-12 gy-4">
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
              <div className="col-12 gy-4">
              <input 
    type="password" 
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
              </div>           <div className='col-12      '>
    <p onClick={()=>router.push('/forgetpassword')} className="text-start mt-2 hover:underline text-gray-500  hover:text-white pointer  transition-all	">{t("login.forgetPassword")}</p>
</div>
              <div className="col-12 w-75 m-auto">
                <button
                  disabled={
                    !formik.isValid ||
                    (Object.keys(formik.touched).length === 0 &&
                      formik.touched.constructor === Object)
                  }
                  type="submit"
                  className="btn form-control border-radius-20 green-bg text-white  w-100 transform-btn"
                >
                  {loadingBtn ? (
                    <div
                      className="spinner-border text-light "
                      role="status"
                    >
                      <span className="visually-hidden"  >Loading...</span>
                    </div>
                  ) : (
                    t("login.title")
                  )}
                </button>
              </div>
   
              <div className="col-12  ">
                <p className="text-center  text-white mt-4 mb-4 middle-line ">
                  {t("login.or")}
                </p>
              </div>

              <div className="col-6 text-white  " onClick={facebookRegister}>
                <button
                  type="button"
                  className="transform-login-btn   inline-flex h-10 w-full items-center justify-center gap-2 rounded     blue-bg p-2 text-sm font-medium text-white  outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Facebook
                  <BiLogoFacebook className="h-[20px] w-[20px] text-white " />
                </button>
              </div>
              <div className="col-6 " onClick={googleRegister}>
                <button
                  type="button"
                  className="transform-login-btn inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Google
                  <img src={gIcon.src} alt="Google" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p class="text-center text-white text-xs ltr">
        &copy;2024 XO Game. All rights reserved.
      </p>
    </div>
  );
};

export default login;
