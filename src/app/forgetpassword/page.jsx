import TextField from "@mui/material/TextField";
import React from 'react'
import icon from "@/assets/photos/icon.png"; 
import './forgetPassword.scss'
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import Link from "next/link";
import { IconBase } from 'react-icons';

 const forgetPassword = () => {
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
          <h1 className="text-center fw-bold">Forget Password</h1>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <div className="d-flex flex-col align-items-center">
          <div className="row max-w-screen-sm ">
            <div className="col-12 ">
            
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
  <div className="circle-bg d-flex justify-content-center align-items-center rounded-full"  >
    
<FaUnlockAlt className='fs-2 '/>

              </div>
              <p className="mt-5 mb-3 text-center">Please enter your Email Address to receive a Verification Code.
</p>
              <TextField
                // error={
                //   formik.touched.email &&
                //   Boolean(formik.errors.email)
                // }
                // helperText={
                // //   formik.touched.email && formik.errors.email
                // }
                // name="email"
                // id="email"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                label="First Name"
                defaultValue={'email'}
                className="mb-2 mt-2  "
                // fullWidth
              />                   </div>

          
            </div>
          </div>

          <button
            type="submit"
            className="forget-btn focus:ring-4   focus:outline-none font-medium rounded-lg text-sm px-24 py-3  text-center  "
           >
            Send
          </button>
        </div>
      {/* </form> */}
    </div>
  </div>  )
}
export default forgetPassword