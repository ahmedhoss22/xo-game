"use client";

import Footer from "@/components/footer/Footer";
import "./coinsOfGame.scss";
import Link from "next/link";
import ticket from "../../assets/photos/Ticket.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";
import { FaUserAlt } from "react-icons/fa";
import { MdNotStarted } from "react-icons/md";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";
import socket from "@/config/socket";
import { setRoomData } from "@/redux/slices/room";
import { notifyError } from "@/components/toastify/toastify";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";
import Loading from "@/components/loading/Loading";
import userImage from "../../assets/photos/userrr.png"; 
import SoundBg from "@/components/soundBg/SoundBg";

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

const coinsOfGame = () => {
  const user = useSelector((state) => state.user.data);
  const { online, data } = useSelector((state) => state.user);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const playingCoins = useSelector((state) => state.playingCoins.data);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.loading.isLoading);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchPlayingCoins());
  }, []);

  useEffect(() => {
    socket.on("online-players", (data) => {
      setPlayers(data);
    });

    socket.on("error", (data) => {
      setError(data.message);
    });

    socket.on("matched", (data) => {
      dispatch(stopLoading());
      dispatch(setRoomData(data));
      router.push("/playground");
    });

    socket.emit("online-players");

    return () => {
      socket.off("online-players");
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);
  useEffect(() => {
    dispatch(fetchUserData());
    // if (!online) {
    //   router.push("/login");
    // } else {
    //   router.push("/coinsofgame");
    // }
  }, []);

  function calcOnlinePlayers(coins) {
    let arr = players.filter((ele) => ele.coins == coins);
    return arr.length;
  }

  function startGame(data) {
    socket.emit("start-game", {
      coins: data.coins,
      winCoins: data.winCoins,
      userID: user._id,
      rounds: data.rounds,
    });
    dispatch(startLoading());
  }

  function handleClose() {
    socket.emit("exit-waiting");
    dispatch(stopLoading());
  } 

  return (
    <>
      {loading ? (
        <Loading
          text="جاري الحصول على بيانات الغرفة"
          close={true}
          handleClose={handleClose}
        />
      ) : (
        <div className="coins-of-game d-flex flex-column ">
          <SoundBg/>
          <div className="flex-grow">
            <div className="container high-z-index  ">
            <header className="d-flex justify-content-between mb-4 align-items-center   text-white p-4 mt-2 ">
        
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
              <Link href="/user" className="link">
                <div className="rtl  col-11 ms-4 mb-1 ">
                  <div className="user-container justify-center">
                    <h5
                      className="text-white mt-1 "
                      style={{ fontSize: "15px" }}
                    >
                      {user?.name?.slice(0, 13) || "user not found"}
                    </h5>
                    <img
                      src={
                        user.provider == "local"
                          ? apiUrl + user.image
                          : user.image || userImage.src
                      }
                      className="userImage circle-image"
                      alt="user image"
                    />
                  </div>
                </div>
              </Link>
              <Link href={""} className="link mt-10">
                <div
                  className="row mb-4  start-play "
                  style={{ cursor: "auto" }}
                >
                  {playingCoins.map((ele, ind) => (
                    <div
                      key={ind}
                      className="col-lg-6 gy-4 d-flex"
                      onClick={() => startGame(ele)}
                      style={{ cursor: "pointer", borderRadius: "6px" }}
                    >
                      <div
                        className="col-9 p-2 start-play-div1"
                        style={{
                          cursor: "pointer",
                          borderRadius: "6px 0 0px 6px ",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <MdNotStarted
                            style={{ fontSize: "50px", color: " purple" }}
                          />
                          <h4>{ele.name}</h4>
                        </div>
                        <p>ألعب مع ناس محترفين وأثبت نفسك .</p>

                        <div className="border-bottom-div d-flex align-items-center justify-content-between">
                          <div className="d-flex gap-1 align-items-center text-secondary  ">
                            <FaUserAlt className="fs-6 mb-3" />
                            <p>{calcOnlinePlayers(ele.coins)} </p>
                          </div>
                          <div className="d-flex gap-1 align-items-center text-secondary  ">
                            <img
                              src={ticket.src}
                              alt="tickets"
                              className="fs-6 mb-3"
                            />
                            <p>{ele.coins} الدخول</p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-3    text-white start-play-div2"
                        style={{ borderRadius: "0 6px 6px 0" }}
                      >
                        <h1> {ele.winCoins} </h1>
                        <h6> ألعب الان</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
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

export default coinsOfGame;
