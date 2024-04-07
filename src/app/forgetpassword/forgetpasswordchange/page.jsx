'use client'
import TextField from "@mui/material/TextField";
import React, { useState } from 'react'
import icon from "@/assets/photos/icon.png"; 
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import Link from "next/link";
import '../forgetPassword.scss'
import { IconBase } from 'react-icons';
import { useTranslation } from "react-i18next";
import { changePasswordValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import Api from "@/config/api";

 const forgetPasswordChange = () => {
  const { t, i18n } = useTranslation();
  const [intialPassword, setInitialPassword] = useState({
    password: "",
    rePassword: "",
    // oldPassword: "",
  });
  function handlePasswordSubmit(values) {
    console.log(values);

    Api.post("/users/change-forget-password", values)
      .then(() => {
        notifySuccess("Password Changed !! ");
        
        formik.resetForm();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }
  const formik = useFormik({
    initialValues: intialPassword,
    validationSchema: changePasswordValidationSchema,
    onSubmit: handlePasswordSubmit,
  });
  return (
    <div className="vh-100 forget-password-bg">
    <div className="container ">
      <div className="mb-10 mt-10">
        <div className="d-flex fs-2 position-fixed  ">
          <Link href="/otp" className="link text-white ">
            <FaLongArrowAltLeft className="" />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fw-bold">             {t("forgetPasswordChange.create")}
</h1>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-col align-items-center">
          <div className="row max-w-screen-sm ">
            <div className="col-12 ">
            
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
  <div className="d-flex justify-content-center align-items-center rounded-full circle-bg" >
    
<FaUnlockAlt className='fs-2 '/>

              </div>
              <p className="mt-5 mb-3 text-center"> {t("forgetPasswordChange.create")} 
</p>
              {/* <TextField
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                name="oldPassword"
                id="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label= {t("forgetPasswordChange.oldPassword")} 
                
                className="mb-2 mt-2  "
                type="password"

                fullWidth
              />    */}
                    <TextField
                error={
                  formik.touched.password &&
                  Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password && formik.errors.password
                }
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label= {t("forgetPasswordChange.newPassword")} 
                type="password"
                
                className="mb-2 mt-2  "
                fullWidth
              />  
                        <TextField
                error={
                  formik.touched.rePassword &&
                  Boolean(formik.errors.rePassword)
                }
                helperText={
                  formik.touched.rePassword && formik.errors.rePassword
                }
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label= {t("forgetPasswordChange.rePassword")} 
                type="password"
                                className="mb-2 mt-2 w-100 "
                fullWidth
              />                   </div>

          
            </div>
          </div>

          <button
            type="submit"
            className=" forget-btn focus:ring-4   focus:outline-none font-medium rounded-lg text-sm px-24  py-3 text-center  "
           >
{t("forgetPasswordChange.save")}          
 </button>
        </div>
      </form>
    </div>
  </div>  )
}
export default forgetPasswordChange