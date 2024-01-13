"use client";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "@/components/footer/Footer";
import Title from "@/components/title/Title";
import "./homepage.scss";
import ticket from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import walletPhoto from "@/assets/photos/wallet-photo.png";
import playNowPhoto from "@/assets/photos/playNow-photo.png";
import playWithPhoto from "@/assets/photos/playWith-photo.png";
import shareGamePhoto from "@/assets/photos/shareGame-photo.png";
import userImage from "@/assets/photos/userrr.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData, offlineUser } from "@/redux/slices/user";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSound from "use-sound";
import sound from "@/assets/sound/s.mp3";
import SoundBg from "@/components/soundBg/SoundBg";
import { selectLoading, stopLoading } from "@/redux/slices/loadingSlice";
import Loading from "@/app/loading";
 

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Homepage = () => {

  const [play] = useSound(sound);
  const user = useSelector((state) => state.user.data);
  
  const isAdmin = user?.isAdmin;
  const online = useSelector((state) => state.user.online);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const [loading ,setLoading] = useState(true)
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(stopLoading());
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(fetchUserData())
  }, []);
  function handleLogout() {
    if (user) {
      router.push("/login");
      dispatch(offlineUser());
    }else{
      // router.push("/login");
    }
  }
  return (
    <>
    {isLoading ? (
      <Loading
      text="loading home ... " 
      close={true}
      handleClose={handleClose}
      />
    ) : (
    <div className="home-page d-flex flex-column ">
    
      {/* <button onClick={()=>setValue(value+1)}></button> */}

      <div className="flex-grow">
         {/* */}
        <header className="d-flex  justify-content-between-lg justify-content-around  mb-4 p-4 mt-2 align-items-center   text-white  ">
          {/* <img src={xIcon.src} alt="" /> */}
          {/* <div className="prize1 white-container justify-center" style={{justifyContent:"center"}}>
            <img src={money.src} className="money" alt="money" />
            <h5>{user.coins}</h5>
          </div> */}
          <div className="d-flex gap-2">
                <div >  <SoundBg /></div>

          <motion.div
            className="ticket-container justify-center"
            variants={textVariants}
            initial={"initial"}
            animate={"animate"}
          >
            <motion.img
              src={dollar.src}
              className="ticket"
              alt="ticket"
              variants={textVariants}
            />
            <motion.div className="ticket-prize " variants={textVariants}>
              <motion.h5>{user?.coins}</motion.h5>
            </motion.div>
          </motion.div>
          </div>
        
          <div className="col-3">
            <Title />
          </div>
        </header>
        <Link href="/user" className="link">
          <div className="rtl  col-lg-11 col-10 ms-4 mb-1 ">
            <div className="user-container justify-center">
              <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                {user?.name?.slice(0, 13) || "user not found"}
              </h5>
              <img
                src={
                  user.provider == "local"
                    ? apiUrl + user?.image
                    : user?.image || userImage.src
                }
                className="userImage circle-image"
                alt="user image"
              />
            </div>
          </div>
        </Link>

        <div className=" row  d-flex horizontal-scroll-container mb-1   high-z-index">
          <div className="col-lg-6 home-page-main-container-layer gy-4 ">
            <div
              className="home-page-main-container pointer playNow d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl"
              onClick={() => {  
                play();
                router.push("/coinsofgame");
              
              }}
            >
              <motion.img
                src={playNowPhoto.src}
                className=" "
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                alt=""
              />
              <div className="text-play-container">
                <h2 className="fw-bold">العب الان</h2>
                <div className="arrow ">
                  <IoIosArrowForward className=" pointer h-5 " />
                </div>
              </div>{" "}
            </div>
          </div>

          <div className="col-lg-6  home-page-main-container-layer  gy-4 ">
            <div
              className="home-page-main-container pointer playWith  w-75 m-auto d-flex  align-items-center justify-content-around text-white fw-bold rtl"
              onClick={() => {
                play();
                router.push("/playwith");
                
              }}
            >
              <img src={playWithPhoto.src} className=" " alt="" />
              <div className="text-play-container">
                <h2 className="fw-bold">
                  العب مع
                  <br /> صديقك
                </h2>{" "}
                <div className="arrow ">
                  <IoIosArrowForward className=" pointer h-5 " />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex high-z-index ">
          <div className="col-lg-6  home-page-main-container-layer gy-4 ">
            <div
              className="home-page-main-container pointer wallet d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl"
              onClick={() => { 
                play();
                router.push("/wallet");
               
              }}
            >
              <img src={walletPhoto.src} alt="" />
              <div className="text-play-container">
                <h2 className="fw-bold">محفظتي</h2>
                <div className="arrow ">
                  <IoIosArrowForward className=" pointer h-5 " />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 home-page-main-container-layer gy-4">
            <div
              className="home-page-main-container pointer shareGame d-flex  w-75 m-auto align-items-center justify-content-around text-white fw-bold rtl"
              onClick={() => {  
                play();
                router.push("/playwith");
              
              }}
            >
              <img src={shareGamePhoto.src} alt="" />
              <div className="text-play-container">
                <h2 className="fw-bold">شارك اللعبة</h2>
                <div className="arrow ">
                  <IoIosArrowForward className=" pointer h-5 " />
                </div>
              </div>
            </div>
          </div>
        </div>

        {!user ? (
          <div className="rtl">
            <div className="col-xl-2 col-lg-3 col-md-5 col-7  ms-4 high-z-index">
              <Link href={"/login"} className="text-decoration-none">
                {" "}
                <div className=" login-btn d-flex align-items-center justify-content-center  border-radius-20 m-2 transform-btn pointer ">
                  <button className="text-white ">تسجيل الدخول الان</button>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rtl">
            <div className="col-xl-2 col-lg-3 col-md-5 col-7  ms-4 high-z-index">
              <div onClick={handleLogout} className="text-decoration-none">
                <div className="   logOut-btn d-flex align-items-center justify-content-center  border-radius-20 m-2 transform-btn pointer ">
                  <button className="text-white ">تسجيل الخروج </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="high-z-index">   
        <Footer />
      </div>
    </div>
     )} 
    </>
  );
};

export default Homepage;
