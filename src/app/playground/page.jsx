"use client";
import "./playground.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../assets/photos/userrr.png";
import ticket from "../../assets/photos/Ticket.png";
import vs from "../../assets/photos/VS.png";
import { useEffect, useState } from "react";
import socket from "@/config/socket";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import Link from "next/link";
import click from "../../assets/sound/clickSound.wav";
import win from "../../assets/sound/success1.mp3";
import lose from "../../assets/sound/lose1.mp3";
import useSound from "use-sound";
import { fetchOtherUser, setRoomData } from "@/redux/slices/room";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StartGameSoundBg from "@/components/startGameSoundBg/StartGameSoundBg";

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

const playground = () => {
  const [clickSound] = useSound(click);
  const [winSound] = useSound(win);
  const [loseSound] = useSound(lose);

  const router = useRouter();
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const room = useSelector((state) => state.room.data);
  const player2 = useSelector((state) => state.room.otherPlayer);
  const turn = useSelector((state) => state.room.data.turn);

  // console.log("player2",player2);
  // console.log("room", room);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchUserData());
    socket.on("winner", (data) => {
      console.log("You win !!");
      notifySuccess("You win");
      winSound();
      setTimeout(() => {
        router.push("/coinsofgame");
        // dispatch(setRoomData({}));
      }, 4000);
    });
    socket.on("loser", (data) => {
      console.log("You win !!");
      notifyError("You lose");
      loseSound();
      setTimeout(() => {
        router.push("/coinsofgame");
        // dispatch(setRoomData({}));
      }, 4000);
    });
    socket.on("player-move", (data) => {
      dispatch(setRoomData(data));
      console.log("player-move", data);
    });
    socket.on("error", (data) => {
      notifyError(data?.message);
    });
    dispatch(fetchUserData());

    return () => {
      socket.off("matched");
      socket.off("winner");
      socket.off("loser");
      socket.off("error");
    };
  }, []);
  useEffect(() => {
    socket.emit("get-room-data", user?._id);
    socket.on("get-room-data", (data) => {
      dispatch(setRoomData(data));
    });
  }, [user]);

  useEffect(() => {
    let otherPlayerId;

    if (room?.userID1 === user._id) {
      otherPlayerId = room?.userID2;
    } else if (room?.userID2 === user._id) {
      otherPlayerId = room?.userID1;
    }

    if (otherPlayerId) {
      dispatch(fetchOtherUser(otherPlayerId));
    }
  }, [user._id, room]);

  const rows = 5;
  const cols = 5;

  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => {
      let boxNo = getBoxNo(rowIndex, colIndex + 1);
      if (room?.player1Moves?.includes(boxNo)) {
        return "X";
      } else if (room?.player2Moves?.includes(boxNo)) {
        return "O";
      } else {
        return "";
      }
    })
  );

  function handleMove(row, column) {
    if (turn === 2) {
      clickSound();
    }
    let move = row * 5 + column;

    socket.emit("player-move", {
      userID: user?._id,
      move,
      roomName: room?.roomName,
    });
  }

  function getBoxNo(row, column) {
    return row * 5 + column;
  }

  return (
    <>
      <div className="playground">
        <StartGameSoundBg />
        <div className="container">
          <header className="d-flex justify-content-between pt-3">
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
                        ? apiUrl + user.image
                        : user.image || userImage.src
                    }
                    className="userImage circle-image"
                    alt="user image"
                  />
                </div>
              </div>
            </Link>
          </header>
          <div className="prizes d-flex col-12 justify-content-center pt-3 ">
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
          </div>

          <div className="players  d-flex col-12 justify-content-center pt-1">
            <motion.div
              className="player1 d-flex"
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              variants={textVariants}
              initial={"initial"}
              animate={"animate"}
            >
              <motion.div className="image-box" variants={textVariants}>
                <motion.img
                  src={
                    user.provider == "local"
                      ? apiUrl + user?.image
                      : user?.image || userImage.src
                  }
                  className="userImage"
                  alt=""
                  variants={textVariants}
                />
              </motion.div>
              <motion.h2 className="o-player fw-bold" variants={textVariants}>
                {user?._id == room?.userID1 ? "X" : "O"}
              </motion.h2>
              <motion.h5 variants={textVariants}>
                {user?.name || "player 1"}
              </motion.h5>
            </motion.div>

            <motion.div
              className="vs"
              variants={textVariants}
              initial={"initial"}
              animate={"animate"}
            >
              <motion.img src={vs.src} alt="VS" variants={textVariants} />
            </motion.div>
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
              <motion.h2 className="x-player fw-bold" variants={textVariants}>
                {user?._id != room?.userID1 ? "X" : "O"}
              </motion.h2>
              <motion.h5 variants={textVariants}>
                {player2.name || "player 2"}
              </motion.h5>
            </motion.div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <div className="big-box">
              {grid.map((row, rowIndex) => (
                <row key={rowIndex} className="row">
                  <div className="d-flex m-1">
                    {row.map((content, colIndex) => (
                      <button
                        onClick={() => handleMove(rowIndex, colIndex + 1)}
                        key={colIndex}
                        className="box1 col-3 m-1 pointer"
                        style={{ userSelect: "none" }}
                      >
                        <h2
                          className="text-center fw-bold "
                          style={{ color: "#fff" }}
                        >
                          {content}
                        </h2>
                      </button>
                    ))}
                  </div>
                </row>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default playground;

