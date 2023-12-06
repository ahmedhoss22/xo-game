"use client";
import { IoIosArrowForward  } from "react-icons/io";
import ChooseLanguage from "../chooseLanguage/Chooselanguage";
import Footer from "../footer/Footer";
import "./homepage.scss";
import Title from "../title/Title";
import userImage from "../../assets/photos/userrr.png";
import money from "../../assets/photos/money-bag.png";
import ticket from "../../assets/photos/Ticket.png";
import walletPhoto from "../../assets/photos/wallet-photo.png";
import playNowPhoto from "../../assets/photos/playNow-photo.png";
import playWithPhoto from "../../assets/photos/playWith-photo.png";
import shareGamePhoto from "../../assets/photos/shareGame-photo.png";
import addFriendPhoto from "../../assets/photos/addFriend-photo.png";
import xIcon from '../../assets/photos/X.png'
import Link from "next/link";

const scrollLeft = () => {
  document.getElementById("content").scrollLeft += 800;
};
const scrollRight = () => {
  document.getElementById("content").scrollLeft -= 800;
};
const Homepage = () => {
  return (
    <div className="home-page">
      <div className="layer">
        <header className="d-flex justify-content-between mb-4 align-items-center   text-white p-4 ">
          <img src={xIcon.src} alt="" />
          <div className="prize1 white-container">
            <img src={money.src} className="money" alt="money" />
            <h5>1000</h5>
          </div>{" "}
          <div className="prize2 white-container">
            <img src={ticket.src} className="ticket mb-3" alt="ticket" />
            <h5>50</h5>
          </div>{" "}
          <div className="col-3">
            {" "}
            <Title />
          </div>
        </header>
        <div className="rtl  col-11 ms-4 mb-1 ">
          <div className="    white-container">
            <h5 className="text-white mt-1 ">User Name</h5>{" "}
            <img src={userImage.src} className="userImage" alt="" />
          </div>
        </div>
        <div className="  d-flex horizontal-scroll-container mb-4   high-z-index">
        
          <Link href={'/playground'} className="col-lg-5 text-decoration-none home-page-main-container-layer gy-4">
            <div className="home-page-main-container d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={playNowPhoto.src} className="w-50" alt="" />
              <div>
                <h2 className="fw-bold">ألعب الان </h2>
                <IoIosArrowForward  className=" pointer h-5 " />
              </div>
            </div>
          </Link>

          <Link href={'/playground'} className="col-lg-5 text-decoration-none home-page-main-container-layer gy-4">
            <div className="home-page-main-container d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={playWithPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">ألعب مع صديق</h2>
                <IoIosArrowForward  className=" pointer h-5 " />
              </div>
            </div>
          </Link>  
          <Link href='/wallet' className="col-lg-5 text-decoration-none home-page-main-container-layer gy-4">
            <div className="home-page-main-container d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={walletPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">محفظتي</h2>
                <IoIosArrowForward  className=" pointer h-5 " />
              </div>
            </div>
          </Link>
        </div>
        <div className="row d-flex high-z-index ">
          <div className="col-lg-6  home-page-main-container-layer gy-1">
            <div className="home-page-main-container d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={walletPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">محفظتي</h2>
                <IoIosArrowForward  className=" pointer h-5 " />
              </div>
            </div>
          </div>

          <div className="col-lg-6  home-page-main-container-layer gy-1">
            <div className="home-page-main-container d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={shareGamePhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">شارك اللعبة</h2>
                <IoIosArrowForward  className=" pointer h-5 " />
              </div>
            </div>
          </div>
        </div>
        <div className="rtl">
          <div className=" col-lg-2   ms-4 high-z-index">
            <ChooseLanguage />
          </div>
        </div>

        <div className="fixed-bottom footer-container  ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
