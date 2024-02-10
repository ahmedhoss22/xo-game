'use client'
import { motion } from "framer-motion";
import { textVariants } from "@/utils/animation";
import localFont from "next/font/local"; 
const myFont = localFont({ src: "../assets/fonts/Pacifico-Regular.ttf" });



const Loading = () => {
  return (
    <motion.div className="not-found-page" >

      <motion.div style={{ color: "#8c0e68", zIndex: "100" }}>
        <motion.div style={myFont.style}>
          <motion.h1  variants={textVariants}
            animate={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.5 } }} className="fw-bold">Loading page ... </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
