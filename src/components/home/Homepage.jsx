"use client";
import { IoIosArrowForward } from "react-icons/io";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "@/redux/slices/user";
import { useRouter } from "next/navigation";
import xIcon from "../../assets/photos/X.png";
import Link from "next/link";

const scrollLeft = () => {
  document.getElementById("content").scrollLeft += 800;
};
const scrollRight = () => {
  document.getElementById("content").scrollLeft -= 800;
};
const Homepage = () => {
  const user = useSelector((state) => state.user.data);
  const online = useSelector((state) => state.user.online);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    if (!online) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="home-page">
      <div className="layer">
        <header className="d-flex justify-content-between mb-4 align-items-center   text-white p-4 ">
          {/* <img src={xIcon.src} alt="" /> */}
          {/* <div className="prize1 white-container justify-center" style={{justifyContent:"center"}}>
            <img src={money.src} className="money" alt="money" />
            <h5>{user.coins}</h5>
          </div> */}
          <div className="prize2 white-container justify-center">
            <img src={ticket.src} className="ticket mb-3" alt="ticket" />
            <h5>{user.coins}</h5>
          </div>
          <div className="col-3">
            <Title />
          </div>
        </header>
        <div className="rtl  col-11 ms-4 mb-1 ">
          <div className="white-container justify-center">
            <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
              {user?.name?.slice(0, 13)}
            </h5>
            <img
              src={user.provider == "local" ? apiUrl + user.image : user.image}
              className="userImage circle-image"
              style={{ width: "40px" }}
              alt=""
            />
          </div>
        </div>
        <div className="  d-flex horizontal-scroll-container mb-4   high-z-index">
          <div
            className="col-lg-5  wallet-layer gy-4 pointer"
            onClick={() => router.push("/playground")}
          >
            <div className="wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={playNowPhoto.src} className="w-50" alt="" />
              <div>
                <h2 className="fw-bold">العب الان</h2>
                <IoIosArrowForward className=" pointer h-5 " />
              </div>
            </div>
          </div>

          <div
            className="col-lg-5  wallet-layer gy-4 pointer"
            onClick={() => router.push("/playground")}
          >
            <div className="wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={playWithPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">
                  العب مع
                  <br /> صديقك
                </h2>
                <IoIosArrowForward className=" pointer h-5 " />
              </div>
            </div>
          </div>
          {/* <div className="col-lg-5  wallet-layer gy-4 pointer" onClick={() => router.push("/wallet")}>
            <div className="wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={walletPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">محفظتي</h2>
                <IoIosArrowForward className=" pointer h-5 " />
              </div>
            </div>
          </div> */}
        </div>
        <div
          className="row d-flex high-z-index pointer"
          onClick={() => router.push("/playground")}
        >
          <div className="col-lg-6  wallet-layer gy-1">
            <div className="wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={walletPhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">محفظتي</h2>
                <IoIosArrowForward className=" pointer h-5 " />
              </div>
            </div>
          </div>

          <div
            className="col-lg-6  wallet-layer gy-1"
            onClick={() => router.push("/")}
          >
            <div className="wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl">
              <img src={shareGamePhoto.src} alt="" />
              <div>
                <h2 className="fw-bold">شارك اللعبة</h2>
                <IoIosArrowForward className=" pointer h-5 " />
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
