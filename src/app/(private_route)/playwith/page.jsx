"use client";

import Footer from "@/components/footer/Footer";
import "./playWith.scss";
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

 

const playWith = () => {
  const dispatch = useDispatch();
  const { t ,i18n } = useTranslation();

  const user = useSelector((state) => state.user.data);
  const [roomId, setRoomId] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const [error, setError] = useState("");
  const isLoading = useSelector(selectLoading);
  const router = useRouter();
  const [openJoin, setOpenJoin] = useState(false);

  const handelJoin = () => {
    setOpenJoin(true)
  }

  const handelCreate = () => {
    setOpenJoin(false)
  }
  useEffect(() => {
    dispatch(fetchUserData());
    socket.on("matched",(data)=>{
      dispatch(setRoomData(data))
      router.push("/playground")
    })
    socket.on("error",(data)=>{
      notifyError(data?.message)
      console.log(data);
    })
    return ()=>{
      socket.off("matched")
      socket.off("error")

    }
  }, []);

  function createRoom() {
    // socket.emit("create-room", user?._id);
    // dispatch(startLoading());
    router.push("/playgroundloading/true")
  }
  function joinRoom() {
    console.log(user._id, roomId);
    socket.emit("join-room", { userID: user?._id, id: roomId });

    // dispatch(startLoading());
  }

  return (
    <>
      <div className="play-with d-flex flex-column ">
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

            {openJoin ? (
              <div className={`d-flex align-items-center justify-content-center ${i18n.language ==='ar'?"rtl":""} mt-4 `}>
                <div className="w-full max-w-xs ">
                  <div
                    // onSubmit={formik.handleSubmit}
                    className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    style={{ background: "var(--purple-color)" }}
                  >
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
{t('playWith.title')}    
                  </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="id"
                        name="id"
                        type="number"
                        placeholder="  ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                      />

                      {/* {formik.touched.id && formik.errors.id ? (
                        <div className="text-red-500">
                          {formik.errors.id}
                        </div>
                      ) : null} */}
                    </div>
                    <div onClick={joinRoom} className="text-white create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    {t('playWith.join')}  
                    </div>
                  </div>
                  <h6 onClick={handelCreate} className="text-center text-white pointer  ">
                  {t('playWith.back')}                    </h6>
                </div>
              </div>
            ) : (
              <div className={`d-flex align-items-center justify-content-center ${i18n.language ==='ar'?"rtl":""} mt-4 `}>
                <div className="w-full max-w-xs ">
                  <div
                    className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    style={{ background: "var(--purple-color)" }}
                  >
                    <div className="mb-4"></div>
                    <div  onClick={createRoom} className=" text-white create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    {t('playWith.create')}  
                    </div>
                    <div onClick={handelJoin} className="text-white create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    {t('playWith.joinRoom')}                       </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="   high-z-index ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default playWith;
