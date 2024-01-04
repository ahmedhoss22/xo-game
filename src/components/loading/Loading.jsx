"use client"; 

import "./loading.scss";
import { GridLoader } from "react-spinners";  
import localFont from "next/font/local";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

const myFont = localFont({ src: "../../assets/fonts/Pacifico-Regular.ttf" });

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

const Loading = ({ text, close , handleClose}) => {

  return (
    <motion.div className="loading-page">
      {close && <motion.div className="close-box">
        <IoMdCloseCircleOutline onClick={handleClose}/>
      </motion.div>}
      <motion.div style={{ zIndex: "100" }}>
        <GridLoader color="#8c0e68" />
      </motion.div>
      <motion.div style={{ color: "#8c0e68", zIndex: "100" }}>
        {" "}
        <motion.div style={myFont.style}  variants={textVariants}
              animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }}>
          <motion.h1 className="fw-bold">{text}</motion.h1>
        </motion.div>
      </motion.div> 
    </motion.div>
  );
};

export default Loading;
