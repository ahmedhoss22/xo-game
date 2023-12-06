"use client";

import "./footer.scss";
import homeIcon from "../../assets/photos/home-page.png";
import leaderIcon from "../../assets/photos/leader-board.png";
import startIcon from "../../assets/photos/start.png";
import cardIcon from "../../assets/photos/shopCard.png";
import userIcon from "../../assets/photos/girl-icon.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center justify-content-between  rtl ">
      <Link href={"/user"}>
       
        <img src={userIcon.src} alt="user" className="pointer" />
      </Link>
      <Link href={""}>
       
        <img src={cardIcon.src} alt="card" className="pointer" />
      </Link>
      <Link href={""}>
       
        <img src={startIcon.src} alt="start" className="pointer" />
      </Link>
      <Link href={""}>
       
        <img src={leaderIcon.src} alt="leader" className="pointer" />
      </Link>
      <Link href={"/"}>
       
        <img src={homeIcon.src} alt="home" className="pointer" />
      </Link>
    </footer>
  );
};

export default Footer;
