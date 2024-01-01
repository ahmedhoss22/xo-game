"use client";
import "./title.scss";
import robot from "../../assets/photos/chatgpt.png";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import Link from "next/link";

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

const Title = () => {
  return (
    <Link href={"/"} className="link">
      <motion.div
        href="/"
        className="title"
        style={myFont.style}
        variants={textVariants}
        initial={"initial"}
        animate={"animate"}
      >
        <motion.img src={robot.src} alt="" variants={textVariants} />
        <motion.div className="title-text d-flex" variants={textVariants}>
          <motion.span className="gray-color ms-3" variants={textVariants}>
            Tic
          </motion.span>
          <motion.span className="purple-color ms-3" variants={textVariants}>
            Tac
          </motion.span>
          <motion.span className="blue-color ms-3" variants={textVariants}>
            Too
          </motion.span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default Title;
