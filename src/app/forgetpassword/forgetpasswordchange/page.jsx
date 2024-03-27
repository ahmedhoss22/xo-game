import TextField from "@mui/material/TextField";
import React from 'react'
import icon from "@/assets/photos/icon.png"; 
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
import Link from "next/link";
import '../forgetPassword.scss'
import { IconBase } from 'react-icons';
 const forgetPasswordChange = () => {
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
          <h1 className="text-center fw-bold">Create New Password</h1>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <div className="d-flex flex-col align-items-center">
          <div className="row max-w-screen-sm ">
            <div className="col-12 ">
            
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
  <div className="d-flex justify-content-center align-items-center rounded-full circle-bg" >
    
<FaUnlockAlt className='fs-2 '/>

              </div>
              <p className="mt-5 mb-3 text-center">Please insert your new password
</p>
              <TextField
                // error={
                //   formik.touched.password &&
                //   Boolean(formik.errors.password)
                // }
                // helperText={
                // //   formik.touched.password && formik.errors.password
                // }
                // name="password"
                // id="password"
                // value={formik.values.password}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                label="Password"
                defaultValue={'password'}
                className="mb-2 mt-2  "
                type="password"

                fullWidth
              />   
                    <TextField
                // error={
                //   formik.touched.password &&
                //   Boolean(formik.errors.password)
                // }
                // helperText={
                // //   formik.touched.password && formik.errors.password
                // }
                // name="password"
                // id="password"
                // value={formik.values.password}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                label="Password"
                type="password"
                defaultValue={'password'}
                className="mb-2 mt-2  "
                fullWidth
              />  
                        <TextField
                // error={
                //   formik.touched.password &&
                //   Boolean(formik.errors.password)
                // }
                // helperText={
                // //   formik.touched.password && formik.errors.password
                // }
                // name="password"
                // id="password"
                // value={formik.values.password}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                label="Password"
                type="password"
                defaultValue={'password'}
                className="mb-2 mt-2 w-100 "
                fullWidth
              />                   </div>

          
            </div>
          </div>

          <button
            type="submit"
            className=" forget-btn focus:ring-4   focus:outline-none font-medium rounded-lg text-sm px-24  py-3 text-center  "
           >
            Save
          </button>
        </div>
      {/* </form> */}
    </div>
  </div>  )
}
export default forgetPasswordChange