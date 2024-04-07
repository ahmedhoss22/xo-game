'use client'
import './forgetPassword.scss'
import TextField from "@mui/material/TextField";
import React, { useState } from 'react'
import { useFormik } from "formik";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useRouter } from "next/navigation";
import { IconBase } from 'react-icons';
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import icon from "@/assets/photos/icon.png"; 
import Link from "next/link";
import Api from "@/config/api";
import * as Yup from "yup";

 const forgetPassword = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter()

  const [loadingBtn, setLoadingBtn] = useState(false);

  function handleEmail(values) {
    console.log(values);
    setLoadingBtn(true);

    Api.post("/users/forgetPassword",values)
    .then(()=>{
      router.push("/forgetpassword/otp")
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
  let formik = useFormik({
    initialValues: {
      email: "", 
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email(),
    }),
    onSubmit: handleEmail,
  });

  return (
    <div className="vh-100 forget-password-bg">
    <div className="container ">
      <div className="mb-10 mt-10">
        <div className="d-flex fs-2 position-fixed  ">
          <Link href="/login" className="link text-white  ">
            <FaLongArrowAltLeft className="" />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fw-bold">              {t("forgetPassword.forget")}
</h1>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <div className="d-flex flex-col align-items-center">
<form onSubmit={formik.handleSubmit}>   <div className="row max-w-screen-sm ">
            <div className="col-12 ">
            
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
  <div className="circle-bg d-flex justify-content-center align-items-center rounded-full"  >
    
<FaUnlockAlt className='fs-2 '/>

              </div>
              <p className="mt-5 mb-3 text-center">
              {t("forgetPassword.title")}
</p>
              <TextField
                error={
                  formik.touched.email &&
                  Boolean(formik.errors.email)
                }
                helperText={
                  formik.touched.email && formik.errors.email
                }
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={t("forgetPassword.email")}
                fullWidth
                label={t("forgetPassword.email")}
                className="mb-2 mt-2  "
              />                   </div>

          
            </div>
          </div> <button
            type="submit"
            disabled={
              !formik.isValid ||
              (Object.keys(formik.touched).length === 0 &&
                formik.touched.constructor === Object)
            }
            className="forget-btn focus:ring-4   focus:outline-none font-medium rounded-lg text-sm px-24 py-3  text-center  "
           >
                           {loadingBtn ? (
                    <div
                      className="spinner-border text-light "
                      role="status"
                    >
                      <span className="visually-hidden"  >Loading...</span>
                    </div>
                  ) : (
                    t("forgetPassword.send")                  )}
                

          </button></form>
       

         
        </div>
      {/* </form> */}
    </div>
  </div>  )
}
export default forgetPassword