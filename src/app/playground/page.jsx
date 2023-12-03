"use client";
import "./playground.scss";
import { FaArrowLeft } from "react-icons/fa";
import userImage from "../../assets/photos/userrr.png";
import money from "../../assets/photos/money-bag.png";
import ticket from "../../assets/photos/Ticket.png";
import xo from "../../assets/photos/xo.png";
import vs from "../../assets/photos/VS.png";
// import useSound from "use-sound";
// import useSound from "use-sound";
// import clickSound from '../../assets/sound/s.mp3'
const playground = () => {

  // const [play] =useSound(clickSound)

  return (
    <>
      <div className="playground">

        <div className="container">
          <header className="d-flex justify-content-between pt-3">
            <FaArrowLeft className="text-white pointer h-5" />
            <div className="user white-container">
              <img src={userImage.src} className="userImage" alt="" />
              <h5 className="text-white mt-1 ">User Name</h5>
            </div>
          </header>
          <div className="prizes d-flex col-12 justify-content-center pt-3 ">
            <div className="prize1 white-container">
              <img src={money.src} className="money" alt="money" />
              <h5>1000</h5>
            </div>
            <div className="prize2 white-container">
              <img src={ticket.src} className="ticket mb-3" alt="ticket" />
              <h5>50</h5>
            </div>
            <div className="prize3 white-container">
              <img src={xo.src} className="xo mb-3" alt="xo" />
              <h5>10</h5>
            </div>
          </div>

          <div className="players  d-flex col-12 justify-content-center pt-3">
            <div className="player1">
              <img src={userImage.src} className="userImage" alt="" />
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

          <div className="d-flex  justify-content-center pt-3">
            <div className="big-box ">
              <div className="row ">
                <div className="d-flex m-1 ">
                  <div className="box1 col-3 mt-1 mb-1" >
                  <h2 className="text-center  "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1 ">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                </div>
                
              </div>
              <div className="row ">
                <div className="d-flex m-1">
                  <div className="box1 col-3 mt-1 mb-1">
                  <h2 className="text-center  fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1 ">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                </div>
                
              </div>
              <div className="row ">
                <div className="d-flex m-1">
                  <div className="box1 col-3 mt-1 mb-1">
                  <h2 className="text-center  fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1 ">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                </div>
                
              </div>
              <div className="row ">
                <div className="d-flex m-1">
                  <div className="box1 col-3 mt-1 mb-1">
                  <h2 className="text-center  fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1 ">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                </div>
                
              </div>
              <div className="row ">
                <div className="d-flex m-1">
                  <div className="box1 col-3 mt-1 mb-1">
                  <h2 className="text-center  fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1 ">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                <div className="box1 col-3 m-1">
                  <h2 className="text-center fw-bold "> X</h2>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default playground;
