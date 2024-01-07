"use client";

import Footer from "@/components/footer/Footer";
import "./playWith.scss";
import Link from "next/link";
import ticket from "@/assets/photos/Ticket.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";
import userImage from "@/assets/photos/userrr.png";
import SoundBg from "@/components/soundBg/SoundBg";
import PlaygroundLoading from "../../(private_route)/playgroundloading/page";
import { useFormik } from "formik";
import * as Yup from "yup";
import socket from "@/config/socket";
import { selectLoading, startLoading } from "@/redux/slices/loadingSlice";

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

const playWith = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const [roomId, setRoomId] = useState(""); 
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;  
  const [error, setError] = useState("");
  const isLoading = useSelector(selectLoading);
  const router = useRouter();
  const [openJoin, setOpenJoin] = useState(false);

  const handelJoin=()=>{
    setOpenJoin(true)
  }

  const handelCreate=()=>{
    setOpenJoin(false)
  }
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  
  function createRoom() { 
    socket.emit("create-room", user?._id);
    // dispatch(startLoading());
  }
  
  function joinRoom() {
    socket.emit("join-room", { userId: user?._id, id: roomId });
    // dispatch(startLoading());
  }
  

  useEffect(() => {
    const handleRoomCreated = (data) => {
      console.log("Room created:", data.id);
      router.push('/playground');
      dispatch(startLoading());
    };
  
    const handleRoomJoined = (data) => {
      console.log("Joined room:", data.id);
      dispatch(startLoading());
    };
  
    const handleError = (data) => {
      setError(data.message);
    };
  
    socket.on("create-room", handleRoomCreated);
    socket.on("join-room", handleRoomJoined);
    socket.on("error", handleError);
  
    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("create-room", handleRoomCreated);
      socket.off("join-room", handleRoomJoined);
      socket.off("error", handleError);
    };
  }, []);
  
  
  return (
    <>
        {isLoading ? (
        <PlaygroundLoading />
      ) : (
      <div className="play-with d-flex flex-column ">
        <SoundBg />
        <div className="flex-grow">
          <div className="container high-z-index  ">
            <header className="d-flex justify-content-between-lg justify-content-around   mb-4 align-items-center   text-white p-4 mt-2 ">
              <motion.div
                className="ticket-container justify-center"
                variants={textVariants}
                initial={"initial"}
                animate={"animate"}
              >
                <motion.img
                  src={ticket.src}
                  className="ticket"
                  alt="ticket"
                  variants={textVariants}
                />
                <motion.div className="ticket-prize " variants={textVariants}>
                  <motion.h5>{user.coins}</motion.h5>
                </motion.div>
              </motion.div>
              <div className="col-3">
                <Title />
              </div>
            </header>
            <Link href="/user" className="link ">
              <div className="rtl  col-11 ms-4 mb-1 ">
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
              <div className="d-flex align-items-center justify-content-center rtl mt-4 ">
                <div className="w-full max-w-xs ">
                  <div
                    // onSubmit={formik.handleSubmit}
                    className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    style={{ background: "var(--purple-color)" }}
                  >
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        ألانضمام الي الغرفة الان
                      </label>
                      <input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  id="id"
  name="id"
  type="number"
  placeholder="أدخل ID"
  onChange={(e) => setRoomId(e.target.value)}
  value={roomId}
/>

                      {/* {formik.touched.id && formik.errors.id ? (
                        <div className="text-red-500">
                          {formik.errors.id}
                        </div>
                      ) : null} */} 
                    </div>
                    <div className="create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                      <button onClick={joinRoom} className="text-white"  >
                        الانضمام
                      </button>
                    </div>
                  </div> 
                    <h6 onClick={handelCreate} className="text-center text-white pointer  ">
                      أنشاء غرفة الأن
                    </h6> 
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center rtl mt-4 ">
                <div className="w-full max-w-xs ">
                  <div
                    className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    style={{ background: "var(--purple-color)" }}
                  >
                    <div className="mb-4"></div>
                    <div className="create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
            

                      <button onClick={createRoom} className="text-white" >
                        أنشاء غرفة
                      </button>
                    
                    </div>
                    <div onClick={handelJoin} className="create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                        <button  className="text-white" >
                          الانضمام الي غرفة
                        </button>
                    </div>
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
           )}
    </>
  );
};

export default playWith;
