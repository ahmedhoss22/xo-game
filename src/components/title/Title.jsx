"use client";
import "./title.scss";
import robot from "../../assets/chatgpt.png";
// import { Pacifico } from 'next/font/google'
import localFont from 'next/font/local'

const myFont =localFont({src: '../../assets/fonts/Pacifico-Regular.ttf'})

// const pacifico = Pacifico({
//   subsets: ["latin"],
//   weight: ['400'], // Corrected weight to '400'
// });

const Title = () => {
  return (
    <div className="title" style={myFont.style} >
      <img src={robot.src} alt="" />
      <div className="title-text d-flex">
        <span className="gray-color ms-3">Tic</span>
        <span className="purple-color ms-3">Tac</span>
        <span className="blue-color ms-3">Too</span>
      </div>
    </div>
  );
};

export default Title;
