"use client"; 

import "./loading.scss";
import { GridLoader } from "react-spinners";  
import localFont from "next/font/local";
import { IoMdCloseCircleOutline } from "react-icons/io";

const myFont = localFont({ src: "../../assets/fonts/Pacifico-Regular.ttf" });

const Loading = ({ text, close , handleClose}) => {

  return (
    <div className="loading-page">
      {close && <div className="close-box">
        <IoMdCloseCircleOutline onClick={handleClose}/>
      </div>}
      <div style={{ zIndex: "100" }}>
        <GridLoader color="#8c0e68" />
      </div>
      <div style={{ color: "#8c0e68", zIndex: "100" }}>
        {" "}
        <div style={myFont.style}>
          <h1 className="fw-bold">{text}</h1>
        </div>
      </div> 
    </div>
  );
};

export default Loading;
