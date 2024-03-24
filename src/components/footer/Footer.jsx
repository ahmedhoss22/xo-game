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
import {usePathname} from 'next/navigation'

const Footer = () => {
  const user = useSelector((state) => state.user.data);
  const isAdmin = user?.isAdmin;
  const activeLink = usePathname();

  const links = [
    { icon: isAdmin ? <RiAdminLine className ='footer-icons ' /> : <FaRegUserCircle className ='footer-icons ' />, href: isAdmin ? '/settings' : '/user' },
    { icon: < RiVisaFill  className ='footer-icons '/>, href: '/payment' },
    { icon: <  FaShoppingCart className ='footer-icons '/>, href: '/card' },
    { icon: < MdNotStarted  className ='footer-icons '/>, href: '/coinsofgame' },
    { icon: <  IoWalletOutline className ='footer-icons ' />, href: '/wallet' },
    { icon: < FaStore className ='footer-icons ' />, href: '/changestore' },
    { icon: < FaHome className ='footer-icons ' />, href: '/home' }
  ];


  return (
    <footer className="footer mt-auto d-flex align-items-center justify-content-between rtl">
      
      {links.map((link, index) => (
  <Link key={index} href={link.href} className={`${activeLink === link.href ?'active-link ': 'not-active'}`}>
    {link.icon}
  </Link>
))}

    </footer>
  );
};

export default Footer;
