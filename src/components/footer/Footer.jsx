"use client";
import "./footer.scss";
import homeIcon from "../../assets/photos/home-page.png";
import leaderIcon from "../../assets/photos/leader-board.png";
import firstPlace from "../../assets/photos/first-place.png";
import startIcon from "../../assets/photos/Start.png";
import cardIcon from "../../assets/photos/shopCard.png";
import userIcon from "../../assets/photos/girl-icon.png";
import Link from "next/link";
import {
  FaCcVisa,
  FaHome,
  FaRegUserCircle,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { MdNotStarted } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.data);

  const isAdmin = user?.isAdmin;
  return (
    <footer className="footer mt-auto   d-flex align-items-center justify-content-between  rtl ">
      {isAdmin ? (
        <Link href={"/settings"} className=" text-white link">
          <RiAdminLine  className="pointer footer-icons"  color="#fff"/>
        </Link>
      ) : (
        <Link href={"/user"} className=" text-white link">
          <FaRegUserCircle className="pointer footer-icons"  color="#fff"/>
        </Link>
      )}

      <Link href={"/payment"} className=" text-white link">
        <RiVisaFill className="pointer footer-icons"  color="#fff"/>
      </Link>
      <Link href={"/card"} className=" text-white link">
        <FaShoppingCart className="pointer footer-icons" color="#fff"/>
      </Link>
      <Link href={"/coinsofgame"} className=" text-white link">
        <MdNotStarted className="pointer footer-icons"  color="#fff"/>
      </Link>
      <Link href={"/wallet"} className=" text-white link">
        <IoWalletOutline className="pointer footer-icons" color="#fff" />
      </Link>
      <Link href={"/changestore"} className=" text-white link">
        <FaStore className="pointer footer-icons" color="#fff" />
      </Link>

      <Link href={"/home"} className=" text-white link">
        <FaHome className="pointer footer-icons" color="#fff" />
      </Link>
    </footer>
  );
};

export default Footer;
