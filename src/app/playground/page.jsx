"use client";
import "./playground.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../assets/photos/userrr.png";
import money from "../../assets/photos/money-bag.png";
import ticket from "../../assets/photos/Ticket.png";
import xo from "../../assets/photos/xo.png";
import vs from "../../assets/photos/VS.png";
import { useEffect, useState } from "react";
import socket from "@/config/socket";
import { notifyError } from "@/components/toastify/toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import Link from "next/link";

const playground = () => {
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  useEffect(() => {
    socket.on("matched", (data) => {
      console.log("Game started");
    });
    socket.on("winner", (data) => {
      console.log("You win !!");
    });
    socket.on("loser", (data) => {
      console.log("You lose !!");
    });
    socket.on("player2-move", (data) => {
      console.log("Player moved !!");
    });
    socket.on("error", (data) => {
      console.log("You lose !!");
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

  const rows = 5;
  const cols = 5;

  // Create a 2D array to represent the grid with alternating content
  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) =>
      (rowIndex + colIndex) % 2 === 0 ? "X" : "Y"
    )
  );

  return (
    <>
      <div className="playground">
        <div className="container">
          <header className="d-flex justify-content-between pt-3">
            <Link href="/" className="link">
              <FaArrowLeft className="text-white pointer h-5" />
            </Link>
            <Link href="/user" className="link">
              <div className="rtl  col-11 ms-4 mb-1 ">
                <div className="white-container justify-center">
                  <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                    {user?.name?.slice(0, 13)}
                  </h5>
                  <img
                    src={
                      user.provider == "local"
                        ? apiUrl + user.image
                        : user.image
                    }
                    className="userImage circle-image"
                    style={{ width: "40px" }}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </header>
          <div className="prizes d-flex col-12 justify-content-center pt-3 ">
            <div className="prize2 white-container">
              <img src={ticket.src} className="ticket mb-3" alt="ticket" />
              <h5>{user.coins}</h5>
            </div>
          </div>

          <div className="players  d-flex col-12 justify-content-center pt-3">
            <div className="player1">
              <img
                src={
                  user.provider == "local" ? apiUrl + user.image : user.image
                }
                className="userImage"
                alt=""
                style={{ width: "30px", borderRadius: "50%" }}
              />
              <h2 className="o-player fw-bold">O</h2>
              <h5>1اللاعب الاول</h5>
            </div>

            <div className="vs">
              <img src={vs.src} alt="VS" />
            </div>
            <div className="player2">
              <img src={userImage.src} className="userImage" alt="" />
              <h2 className="x-player fw-bold">X</h2>
              <h5>2اللاعب الثاني</h5>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-3">
            <div className="big-box">
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  <div className="d-flex m-1">
                    {row.map((content, colIndex) => (
                      <div key={colIndex} className="box1 col-3 m-1">
                        <h2
                          className="text-center fw-bold "
                          style={{ color: "#fff" }}
                        >
                          {content}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default playground;
