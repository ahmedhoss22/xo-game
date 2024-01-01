'use client'
import "./wallet.scss";
import visaImage from "../../../assets/photos/visa-icon.png";
import paypalWord from "../../../assets/photos/paypal-word.png";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../../assets/photos/userrr.png";
import Title from "@/components/title/Title";
import { fetchUserData } from "@/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const wallet = () => {

  const user = useSelector((state) => state.user.data);
  const online = useSelector((state) => state.user.online);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    // if (!online) {
    //   router.push("/login");
    // } else {
    //   router.push("/");
    // }
  }, []);
  return (
    <div className="wallet-page">
      <header className="d-flex justify-content-between mb-4 align-items-center pt-3 text-white p-4 ">
        <Link href={'/home'} className="link">
                  <FaArrowLeft className=" pointer h-5 text-white" />

        </Link>

        <div className="col-3">
          {" "}
          <Title />
        </div>
        <h2>المحفظة</h2>
        <div className="d-flex gap-5">
          {/* <div className="user white-container">
            <img src={userImage.src} className="userImage" alt="" />
            <h5 className="  mt-1 ">User Name</h5>
          </div> */}
            <Link href='/user' className="link">
              <div className="rtl  col-11 ms-4 mb-1 ">
          <div className="user-container justify-center">
            <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
              {user?.name?.slice(0, 13)}
            </h5>
            <img
              src={user.provider == "local" ? apiUrl + user.image : user.image}
              className="userImage circle-image"
               alt="user image"
            />
          </div>
        </div>
        </Link>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="credit col-12 d-flex align-items-center justify-content-around rtl text-white ">
            <h2>رصيدي</h2>
            <h2>00000</h2>
          </div>
          <hr className="text-white w-75 m-auto mt-1 mb-20" />
          <div className="credit col-12 d-flex align-items-center justify-content-around rtl text-white">
            <h2>المكافائات</h2>
            <h2>00000</h2>
          </div>
          <hr className="text-white w-75 m-auto mt-1" />
          <div className="credit col-12 d-flex align-items-center justify-content-around rtl text-white">
            <h2> أضافة رصيدي </h2>
            <div className="d-flex  align-items-center justify-content-center">
              <img src={visaImage.src} alt="" />
              <img src={paypalWord.src} alt="" />
            </div>
            <FaArrowLeft className="text-white pointer h-5" />
          </div>
          <hr className="text-white w-75 m-auto mt-1" />
          <div className="credit col-12 d-flex align-items-center justify-content-around rtl text-white">
            <h2> سحب رصيدي</h2>{" "}
            <div className="d-flex  align-items-center justify-content-center">
              <img src={visaImage.src} alt="" />
              <img src={paypalWord.src} alt="" />
            </div>
            <FaArrowLeft className="text-white pointer h-5" />
          </div>
          <hr className="text-white w-75 m-auto mt-1" />
        </div>
      </div>
    </div>
  );
};

export default wallet;
