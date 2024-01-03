"use client";
import "./login.scss";
import emailIcon from "@/assets/photos/email-icon.png";
import passwordIcon from "@/assets/photos/password-icon.png";
import gIcon from "@/assets/photos/google-icon.png";
import { BiLogoFacebook } from "react-icons/bi";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import {  useRouter } from "next/navigation"; 
import { useSelector } from "react-redux";

const login = () => {
  function handleLogin(values) {
    Api.post("/auth/login", values)
      .then(() => {
        notifySuccess("Welcome!!");
        router.push("/coinsofgame");
      })
      .catch((err) => {
        let errMsg = err?.response?.data?.message;
        notifyError(Array.isArray(errMsg) ? errMsg[0] : errMsg);
        console.log(err);
      });
  }

  // ... rest of your login component code

  const router = useRouter();
  const online = useSelector((state) => state.user.online);

  // useEffect(() => {
  //   if (online) router.push("/home");
  // }, []);

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema,
    onSubmit: handleLogin,
  });

  function googleRegister() {
    // console.log(process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/google/login");
    // redirect(process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/google/login")
    console.log("asdsasadsad");
    router.push(process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/google/login")
  }
  function facebookRegister() {
    location.href =
      process.env.NEXT_PUBLIC_API_SERVER + "/api/auth/facebook/login";
  }

  return (
    <div className="login-bg">
      <div className="rtl">
        <div className="col-lg-2 col-md-3 col-6 ">
          <Link href={"/register"} className="text-decoration-none">
            <div className="login-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
              <button className="text-white">أنشاء حسابك الان</button>
            </div>
          </Link>
        </div>
      </div>
      <div className="login m-2  ">
        <form className="col-xl-3  col-lg-4 col-md-5 col-sm-7 col-10 form-shape shadow mt-4"
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
                  className="form-control input-color "
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
                  className="form-control input-color "
                  type="password"
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
            <div className="col-12 w-75 m-auto">
              <button
                type="submit"
                className="btn form-control border-radius-20 green-bg text-white mt-4  w-100 transform-btn"  >
                تسجيل الدخول
              </button>
            </div>

            <div className="col-12  ">
              <p className="text-center  text-white mt-4 mb-4 middle-line ">
                أنشأ حسابك {/*  عن طريق  */}
              </p>
            </div>
            <div className="col-12 d-flex mb-10 justify-content-between">
              <div
                onClick={facebookRegister}
                className="col-5 d-flex blue-bg border-radius-20 align-items-center justify-content-center p-1 transform-btn pointer"
              >
                <button
                  className="btn form-control text-white facebook-btn"
                  type="button"
                >
                  Facebook
                </button>
                <BiLogoFacebook className="fs-1 w-100 text-white" />
              </div>

              <div
                onClick={googleRegister}
                className="col-5 d-flex white-bg p-1 border-radius-20 align-items-center justify-content-center transform-btn pointer"
              >
                <button className="btn form-control google-btn" type="button">
                  Google
                </button>
                <img src={gIcon.src} alt="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
