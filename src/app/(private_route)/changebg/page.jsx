import { FaArrowLeft } from "react-icons/fa";
import "./changeBg.scss";
import userImage from "../../../assets/photos/userrr.png";
import smallBg1 from "../../../assets/photos/chanfe-bg1.png";
import smallBg2 from "../../../assets/photos/change-bg2.png";
import smallBg3 from "../../../assets/photos/change-bg3.png";
import smallBg4 from "../../../assets/photos/change-bg4.png";
import smallBg5 from "../../../assets/photos/change-bg5.png";  
import Title from "@/components/title/Title";
import Link from "next/link";

const changeBg = () => {
  return (
    <div className="change-bg">
      <div className="container">
        <header
          className="d-flex justify-content-between pt-3"
          style={{ marginBottom: "200px" }}
        >
          <Link href={"/"}>
            {" "}
            <FaArrowLeft className="text-white pointer h-5" />
          </Link>

          <div>
            <Link href="/message">
              {" "}
              <Title />
            </Link>
          </div>

          <Link
            href={"/user"}
            className="user white-container text-decoration-none"
          >
            <img src={userImage.src} className="userImage pointer" alt="" />
            <h5 className="text-white mt-1 ">User Name</h5>
          </Link>
        </header>
        <div className="row">
          <div className="col-lg-6 rtl gy-4 mb-4">
            <div className="change-title">
              <h3 className=" text-white"> الخلفية</h3>
            </div>
            <div className="main-bg d-flex align-items-center justify-content-center gap-5">
              <FaArrowLeft className="text-white pointer h-5" />
              <img src={smallBg1.src} alt="" />
              <FaArrowLeft className="text-white pointer h-5" />
            </div>
            <div className="other-bg  d-flex align-items-center justify-content-center gap-2 mt-4">
              <img src={smallBg2.src} alt="" />
              <img src={smallBg3.src} alt="" />
              <img src={smallBg4.src} alt="" />
              <img src={smallBg5.src} alt="" />
            </div>
          </div>
          <div className="col-lg-6 rtl gy-4 ">
            <div className="change-title">
              <h3 className=" text-white   "> XOXO </h3>
            </div>{" "}
            <div className="d-flex align-items-center justify-content-center gap-5">
              <FaArrowLeft className="text-white pointer h-5" />
              <h1 className="red-color">X</h1>
              <FaArrowLeft className="text-white pointer h-5" />
            </div>
            <div className=" d-flex align-items-center justify-content-center gap-5 mt-20">
              <h2 className="red-color">X</h2>
              <h2 className="red-color">X</h2>
              <h2 className="red-color">X</h2>
              <h2 className="red-color">X</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default changeBg;
