'use client'
import '../forgetPassword.scss'
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from 'react'
import Api from "@/config/api";
import Link from "next/link";
import icon from "@/assets/photos/icon.png"; 
import { IconBase } from 'react-icons';
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { changeForgetPasswordValidationSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { fetchUserData } from "@/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { Router } from '@mui/icons-material';
import { notifyError, notifySuccess } from '@/components/toastify/toastify';

 const forgetPasswordChange = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [intialPassword, setInitialPassword] = useState({
    password: "",
    rePassword: "", 
  });
  const formik = useFormik({
    initialValues: intialPassword,
    validationSchema: changeForgetPasswordValidationSchema,
    onSubmit: handlePasswordChange,
  });
  function handlePasswordChange(values) {
    console.log(values);
    console.log('values');

    Api.post("/users/change-forget-password", values)
      .then(() => {
        notifySuccess("Password Changed !! ");
        
        Router.push('/login')
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }

 
  return (
    <div className="vh-100 forget-password-bg">
    <div className="container ">
      <div className="mb-10 mt-10">
        <div className="d-flex fs-2 position-fixed  ">
          <Link href="/forgetpassword/otp" className="link text-white ">
            <FaLongArrowAltLeft className="" />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fw-bold">            {i18n.language==='ar'?" قم بأنشاء كلمة سر جديد":" Create New Password "}  
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
              <p className="mt-5 mb-3 text-center">      {i18n.language==='ar'?"من فضلك قم بادخال كلمة السر الجديدة":" Please insert your new password "}  
</p>
         
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
                label=   {i18n.language==='ar'?"كلمة السر الجديدة":" New Password "}  
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
                label=  {i18n.language==='ar'?"تأكيد كلمة السر":" Confirm Password "}  
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
{i18n.language==='ar'?"حفظ":" Save "}   </button>
        </div>
      </form>
    </div>
  </div>  )
}
export default forgetPasswordChange