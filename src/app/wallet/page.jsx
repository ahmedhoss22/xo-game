import "./wallet.scss";
import visaImage from "../../assets/photos/visa-icon.png";
import paypalWord from "../../assets/photos/paypal-word.png";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../assets/photos/userrr.png";
import Title from "@/components/title/Title";

const wallet = () => {
  return (
    <div className="wallet">
      <header className="d-flex justify-content-between mb-4 align-items-center pt-3 text-white p-4 ">
        <FaArrowLeft className=" pointer h-5" />

        <div className="col-3">
          {" "}
          <Title />
        </div>
        <h2>المحفظة</h2>
        <div className="d-flex gap-5">
          <div className="user white-container">
            <img src={userImage.src} className="userImage" alt="" />
            <h5 className="  mt-1 ">User Name</h5>
          </div>
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
