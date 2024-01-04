"use client";
import "./playgroundLoading.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "@/assets/photos/userrr.png";
import ticket from "@/assets/photos/Ticket.png";
import vs from "@/assets/photos/VS.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import Link from "next/link";
import { motion } from "framer-motion";
import StartGameSoundBg from "@/components/startGameSoundBg/StartGameSoundBg";
import { setRoomData } from "@/redux/slices/room";

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

const playgroundLoading = () => {
  const [data, setData] = useState({});
  const [playerNo, setPlayerNumber] = useState("");
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const room = useSelector((state) => state.room.data);
  const player2 = useSelector((state) => state.room.otherPlayer);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    let otherPlayerId;

    dispatch(setRoomData(data));

    if (room?.userID1 === user?._id) {
      otherPlayerId = room?.userID2;
      setPlayerNumber(1);
    } else if (room?.userID2 === user._id) {
      otherPlayerId = room?.userID1;
      setPlayerNumber(2);
    }
  }, [user?._id, room]);

  return (
    <>
      <div className="playground-loading">
        <StartGameSoundBg />
        <div className="container">
          <header className="d-flex  justify-content-between-lg justify-content-around  pt-4 pb-4">
            <Link href="/coinsofgame" className="link">
              <FaArrowLeft className="text-white pointer h-5" />
            </Link>
            <Link href="/user" className="link">
              <div className="rtl  col-11 ms-4 mb-1 ">
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
          </header>
          <div className="prizes d-flex col-12 justify-content-center pt-3 ">
            <div
              className="ticket-container justify-center" 
            >
              <img
                src={ticket.src}
                className="ticket"
                alt="ticket" 
              />
              <motion.div className="ticket-prize "  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }}>
                <motion.h5>....</motion.h5>
              </motion.div>
            </div>
          </div>

          <div className="players  d-flex col-12 justify-content-center pt-1">
            <div
              className="player1 d-flex"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }} 
            >
              <div className="image-box" variants={textVariants}>
                <img
                  src={
                    user.provider == "local"
                      ? apiUrl + user?.image
                      : user?.image || userImage.src
                  }
                  className="userImage"
                  alt="" 
                />
              </div>
              <motion.h2 className="o-player fw-bold"  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }}>
                {/* {user?._id == room?.userID1 ? "X" : "O"} */}....
              </motion.h2>
              <h5 variants={textVariants}>
                {user?.name || "player 1"}
              </h5>
            </div>

            <div
              className="vs" 
            >
              <img src={vs.src} alt="VS"  />
            </div>
            <motion.div
              className="player2"
              variants={textVariants}
              initial={"initial"}
              animate={"animate"}
            >
              <motion.img
                src={
                  player2?.provider == "local"
                    ? apiUrl + player2?.image
                    : player2?.image || userImage.src
                }
                alt=""
                variants={textVariants}
              />
              <motion.h2 className="x-player fw-bold"  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }}>
                {/* {user?._id != room?.userID1 ? "X" : "O"} */}.....
              </motion.h2>
              <motion.h5  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }}>
                {/* {player2?.name || "player 2"} */} .....
              </motion.h5>
            </motion.div>
          </div>
          <motion.h2  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }} className="text-white text-center mt-20" ><motion.span >. . . . . . .</motion.span> جاري الحصول علي بيانات الغرفة </motion.h2>

        </div>
      </div>
    </>
  );
};

export default playgroundLoading;
