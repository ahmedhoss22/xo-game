"use client";
import "./playground.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "@/assets/photos/userrr.png";
import ticket from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import vs from "@/assets/photos/VS.png";
import { useEffect, useState } from "react";
import socket from "@/config/socket";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import Link from "next/link";
import click from "@/assets/sound/clickSound.wav";
import win from "@/assets/sound/success1.mp3";
import lose from "@/assets/sound/lose1.mp3";
import useSound from "use-sound";
import { fetchOtherUser, setRoomData } from "@/redux/slices/room";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import StartGameSoundBg from "@/components/startGameSoundBg/StartGameSoundBg";
import WinModel from "@/components/winModel/WinModel";
import { textVariants } from "@/utils/animation";

const playground = () => {
  const [modal, setModal] = useState({
    open: false,
    winner: false,
  });

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
  const turn = room?.data?.turn
  const [playerNo, setPlayerNumber] = useState(1)
  const [hoverClass, setHoverClass] = useState(null)
  console.log(room);

  useEffect(() => {
    dispatch(fetchUserData());
    socket.on("winner", (data) => {
      setModal({ open: true, winner: true });
      winSound();
      setTimeout(() => {
        setModal({ open: false, winner: true });
        router.push("/coinsofgame");
        dispatch(setRoomData({}));
      }, 4000);
    });
    socket.on("loser", (data) => {
      setModal({ open: true, winner: false });
      loseSound();
      setTimeout(() => {
        setModal({ open: false, winner: false });
        router.push("/coinsofgame");
        dispatch(setRoomData({}));
      }, 4000);
    });
    socket.on("player-move", (data) => {
      clickSound();
      dispatch(setRoomData(data));
    });
    socket.on("error", (data) => {
      notifyError(data?.message);
    });
    dispatch(fetchUserData());
    socket.emit("get-room-data", user?._id);


    socket.on("get-room-data", (data) => {
      if (!data) {
        router.push("/coinsofgame");

      }
      console.log(data);
      dispatch(setRoomData(data));
    });

    return () => {
      socket.off("matched");
      socket.off("winner");
      socket.off("loser");
      socket.off("error");
    };
  }, []);
  useEffect(() => {
    let otherPlayerId;
    socket.on("player-move", (data) => {
      dispatch(setRoomData(data));
      console.log("player-move", data);
    });

    if (room?.userID1 === user?._id) {
      otherPlayerId = room?.userID2;
      setPlayerNumber(1)
    } else if (room?.userID2 === user._id) {
      otherPlayerId = room?.userID1;
      setPlayerNumber(2)
    }

    if (otherPlayerId) {
      dispatch(fetchOtherUser(otherPlayerId));
    }
    if (playerNo == 1) {
      setHoverClass(`x-hover`)
    } else {
      setHoverClass(`o-hover`)
    }
  }, [user?._id, room]);

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
    clickSound();
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
  function disableBtn(row, column) {
    let btn = getBoxNo(row, column)
    return room?.player1Moves?.includes(btn) || room?.player2Moves?.includes(btn)
  }
  return (
    <>
      <div className="playground">
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

          <div className="pt-3 prizes d-flex flex-column align-items-center col-12 justify-content-center  ">
            {/* <h6 className="text-white fw-bold">Room Number 123456</h6> */}
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
                <motion.h5>{room?.winCoins} </motion.h5>
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
              <p style={{ color: "#fff", textAlign: "center" , margin:"0" , fontWeight:700 , fontSize:"24px"}}>{playerNo == 1 ? `${room?.player1Wins || "0"} - ${room?.player2Wins|| "0"}` : `${room?.player2Wins|| "0"} - ${room?.player1Wins|| "0"}`}</p>
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
                {player2?.name || "player 2"}
              </motion.h5>
            </motion.div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <div className="big-box">
              {grid.map((row, rowIndex) => (
                <row key={rowIndex} className="row">
                  <div className="d-flex m-1 ">
                    {row.map((content, colIndex) => (

                      <button
                        onClick={() => handleMove(rowIndex, colIndex + 1)}
                        key={colIndex}
                        className={`box1 col-3 m-1 pointer ${!disableBtn(rowIndex, colIndex + 1) && room?.turn == playerNo && hoverClass}`}
                        style={{ userSelect: "none", backgroundColor: disableBtn(rowIndex, colIndex + 1) ? "gray" : "var(--purple-color)" }}
                        disabled={room?.turn != playerNo || disableBtn(rowIndex, colIndex + 1)}
                      // disabled={room?.turn != playerNo }
                      >
                        <h2
                          className={`text-center fw-bold  `}
                          style={{ color: "#fff", margin: "0" }}
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
        <WinModel
          open={modal.open}
          winner={modal.winner}
        />
      </div>
    </>
  );
};

export default playground;

