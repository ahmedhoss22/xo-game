"use client";
import "./level.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../assets/photos/userrr.png";

const level = () => {
  return (
    <>
      <div className="level">
        <div className="container">
          <header className="d-flex justify-content-between pt-3">
            <FaArrowLeft className="text-white pointer h-5" />
            <div className="user white-container">
              <img src={userImage.src} className="userImage" alt="" />
              <h5 className="text-white mt-1 ">User Name</h5>
            </div>
          </header>
          <div className="center-screen">
            <div className="col-lg-3 col-9   user-level  text-white rtl text-center border-radius-20">
              <div className="level-num green-bg  p-2 m-4 border-radius-20 w-75">
                بطولة 6 مستوايات
              </div>
              <div className="win-num d-flex gap-2 p-2 mb-3 green-bg border-radius-20 justify-content-center align-items-center w-75">
                الفوز
                <FaArrowLeft className="text-white pointer h-5" />1
                <FaArrowLeft className="text-white pointer h-5" />
              </div>
              <button className="p-4 pt-2 pb-2 mb-4 green-bg border-radius-20">
                {" "}
                أبدأ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default level;
