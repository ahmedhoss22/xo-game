'use client'
import  { useEffect ,useState} from "react";
import Link from 'next/link'
import TextField from "@mui/material/TextField";
import React from 'react'
import '../forgetPassword.scss'
import icon from "@/assets/photos/icon.png"; 
import { FaLongArrowAltLeft, FaUnlockAlt } from 'react-icons/fa';
 const otp = () => {
    const [page, setPage] = useState("login");
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();
    const [timerCount, setTimer] = useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);
  
    function resendOTP() {
      if (disable) return;
      axios
        .post("http://localhost:5000/send_recovery_email", {
          OTP: otp,
          recipient_email: email,
        })
        .then(() => setDisable(true))
        .then(() => alert("A new OTP has succesfully been sent to your email."))
        .then(() => setTimer(60))
        .catch(console.log);
    }
  
    function verfiyOTP() {
      if (parseInt(OTPinput.join("")) === otp) {
        setPage("reset");
        return;
      }
      alert(
        "The code you have entered is not correct, try again or re-send the link"
      );
      return;
    }
  
    useEffect(() => {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          lastTimerCount <= 1 && clearInterval(interval);
          if (lastTimerCount <= 1) setDisable(false);
          if (lastTimerCount <= 0) return lastTimerCount;
          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }, [disable]);
  return (

    <div className="vh-100 forget-password-bg ">
    <div className="container ">
      <div className="mb-10 mt-10">
        <div className="d-flex fs-2 position-fixed  ">
          <Link href="/forgetpassword" className="link text-white  ">
            <FaLongArrowAltLeft className="" />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center fw-bold">Verification Code</h1>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <div className="d-flex flex-col align-items-center">
          <div className="row max-w-screen-sm ">
            <div className="col-12  mb-5">
            
              <div className="col-12 d-flex justify-content-center align-items-center flex-col">
  <div className="d-flex justify-content-center align-items-center rounded-full circle-bg">
    
<FaUnlockAlt className='fs-2 '/>

              </div>
              <p className="mt-5 mb-3 text-center">Please enter the digit code you have received.
</p>
<div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <div className="w-10 h-16 ">
                  <input
                    maxLength="1"
                    className="text-gray-900  h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    style={{ width: '70px' }}
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        e.target.value,
                        OTPinput[1],
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-10 h-16 ">
                  <input
                    maxLength="1"
                    className="text-gray-900  h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    style={{ width: '70px' }}
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        e.target.value,
                        OTPinput[2],
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-10 h-16 ">
                  <input
                    maxLength="1"
                    className="
                    text-gray-900   h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    style={{ width: '70px' }}
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        e.target.value,
                        OTPinput[3],
                      ])
                    }
                  ></input>
                </div>
                <div className="w-10 h-16 ">
                  <input
                    maxLength="1"
                    className="
                    text-gray-900   h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    style={{ width: '70px' }}
                    name=""
                    id=""
                    onChange={(e) =>
                      setOTPinput([
                        OTPinput[0],
                        OTPinput[1],
                        OTPinput[2],
                        e.target.value,
                      ])
                    }
                  ></input>
                </div>
              </div>              </div>

          
            </div>
          </div>
<div className="col-md-3 col-8 ms-4">
  <button
            type="submit"
            className="forget-btn focus:ring-4  focus:outline-none font-medium rounded-lg text-sm px-36 py-3 text-center  "
           >
            Verify
          </button>
</div>
          
        </div>
      {/* </form> */}
    </div>
  </div>
  
   )
}
export default otp