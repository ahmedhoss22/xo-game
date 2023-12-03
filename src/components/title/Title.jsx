"use client";
import "./title.scss";
import robot from "../../assets/photos/chatgpt.png";
import localFont from 'next/font/local';

const myFont = localFont({ src: '../../assets/fonts/Pacifico-Regular.ttf' });

const Title = ({ height, fontsize, top }) => {
  return (
    <div className="title" style={myFont.style}>
      <img src={robot.src} alt="" style={{ height: height }} />
      <div className="title-text d-flex" style={{ fontSize: fontsize, top: top }}>
        <span className="gray-color ms-3">Tic</span>
        <span className="purple-color ms-3">Tac</span>
        <span className="blue-color ms-3">Too</span>
      </div>
    </div>
  );
};

export default Title;
