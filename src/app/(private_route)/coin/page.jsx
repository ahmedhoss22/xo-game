"use client";

import Footer from "@/components/footer/Footer";
import "./coin.scss";
import Link from "next/link";
import ticket from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";
import userImage from "@/assets/photos/userrr.png";
import SoundBg from "@/components/soundBg/SoundBg"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import socket from "@/config/socket";
import { selectLoading, startLoading } from "@/redux/slices/loadingSlice";
import { setRoomData } from "@/redux/slices/room";
import { notifyError } from "@/components/toastify/toastify";
import { useTranslation } from "react-i18next";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import { textVariants } from "@/utils/animation";

 

const coin = () => {
   const { t ,i18n } = useTranslation();

  const user = useSelector((state) => state.user.data);
   const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
   const router = useRouter();
 
 

  return (
    <>
      <div className="coin d-flex flex-column ">
         <div className="flex-grow">
          <div className="container high-z-index  ">
            <header className="d-flex justify-content-between-lg justify-content-around   mb-4 align-items-center   text-white p-4 mt-2 ">
            <div className="d-flex gap-2">
          
      <div >  <SoundBg /></div>
      <div >  <ChooseLanguage /></div>
          <motion.div
            className="ticket-container justify-center pointer"
            variants={textVariants}
            initial={"initial"}
            animate={"animate"}              
            onClick={()=>router.push('/coin')}

          >
            <motion.img
              src={dollar.src}
              className="ticket "
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
            <Link href="/user" className="link ">
              <div className="  col-11 ms-4 mb-1 rtl ">
                <div className="user-container justify-center">
                  <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                    {user?.name?.slice(0, 13) || "user not found"}
                  </h5>
                  <img
                    src={
                      user.provider == "local"
                        ? apiUrl + user?.image
                        : user.image || userImage.src
                    }
                    className="userImage circle-image"
                    alt="user image"
                  />
                </div>
              </div>
            </Link>

        
              <div className={`d-flex align-items-center justify-content-center ${i18n.language ==='ar'?"rtl":""} mt-4 `}>
                <div className="w-full max-w-xs ">
                  <div
                    className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    style={{ background: "var(--purple-color)" }}
                  >
                    <div className="mb-4"></div>
                    <div  
                                  onClick={()=>router.push('/changestore')}

                     className=" text-white create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    {t('coin.changeStore')}  
                    </div>
                    <div 
                                  onClick={()=>router.push('/card')}

                    className="text-white create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    {t('coin.card')}                       </div>
                  </div>
                </div>
              </div>
           </div>
        </div>

        <div className="   high-z-index ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default coin;
