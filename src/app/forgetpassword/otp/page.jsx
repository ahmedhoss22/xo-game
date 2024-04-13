'use client'
import '../forgetPassword.scss'
import React from 'react'
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import Link from 'next/link'
import TextField from "@mui/material/TextField";
import icon from "@/assets/photos/icon.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import Api from '@/config/api';
import { notifyError } from '@/components/toastify/toastify';
import { useRouter } from 'next/navigation';

const otp = () => {
  
  const { t, i18n } = useTranslation();
  const router = useRouter()
  const [loadingBtn, setLoadingBtn] = useState(false);

  const initialValues = {
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  };

  const validationSchema = Yup.object().shape({
    otp1: Yup.string().required('OTP is required'),
    otp2: Yup.string().required('OTP is required'),
    otp3: Yup.string().required('OTP is required'),
    otp4: Yup.string().required('OTP is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
    Api.post("/users/otp-verify", { otp })
      .then(() => {
        console.log("Otp done !!");
        router.push("/forgetpassword/forgetpasswordchange")
      })
      .catch((err) => {
        setLoadingBtn(false);

        let errMsg = err?.response?.data?.message
        notifyError(Array.isArray(errMsg) ? errMsg[0] : errMsg)
        console.log(err);
      })
      .finally(() => {
        setLoadingBtn(false);
      });

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (

    <div className="vh-100 forget-password-bg">
      <div className="container">
        <div className="mb-10 mt-10">
          <div className="d-flex fs-2 position-fixed">
            <Link href="/forgetpassword" className="text-decoration-none text-white">
              <FaLongArrowAltLeft className="" />
            </Link>
          </div>
          
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fw-bold">   {i18n.language==='ar'?"      كود التحقق":" Verification Code "}</h1>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-col align-items-center">
          <div className="row max-w-screen-sm">
            <div className="col-12  mb-5">
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
                <div className="d-flex justify-content-center align-items-center rounded-full circle-bg">
                  <FaUnlockAlt className="fs-2" />
                </div>
                <p className="mt-5 mb-3 text-center">  {i18n.language==='ar'?" من فضلك قم بادخال كود التحقق الذي وصل لك ":" Please enter the digit code you have received. "}</p>
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                 
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-10 h-16 ">
                      <input
                        maxLength="1"
                        className="text-gray-900  h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        style={{ width: '70px' }}
                        name="otp1"
                        value={formik.values.otp1}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="w-10 h-16 ">
                      <input
                        maxLength="1"
                        className="text-gray-900  h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        style={{ width: '70px' }}
                        name="otp2"
                        value={formik.values.otp2}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="w-10 h-16 ">
                      <input
                        maxLength="1"
                        className="text-gray-900   h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        style={{ width: '70px' }}
                        name="otp3"
                        value={formik.values.otp3}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                    <div className="w-10 h-16 ">
                      <input
                        maxLength="1"
                        className="text-gray-900   h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        style={{ width: '70px' }}
                        name="otp4"
                        value={formik.values.otp4}
                        onChange={formik.handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
          </div>
          <div className="col-md-3 col-8 ms-4  d-flex justify-content-center">
            <button
              type="submit"
              className="forget-btn focus:ring-4  focus:outline-none font-medium rounded-lg text-sm px-28 py-3 text-center"
            >
 {i18n.language==='ar'?" تحقق":" Verify "}            </button>
          </div>
        </div>
      </form>
    </div>

  )
}
export default otp