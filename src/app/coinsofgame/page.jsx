"use client";
import Footer from "@/components/footer/Footer";
import "./coinsOfGame.scss";
import Link from "next/link";
import ticket from "../../assets/photos/Ticket.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";

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

const coinsOfGame = () => {
  // const user = useSelector((state) => state.user.data);
  // const online = useSelector((state) => state.user.online);
  // const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  // const router = useRouter();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserData());
  //   if (!online) {
  //     router.push("/login");
  //   } else {
  //     router.push("/coinsofgame");
  //   }
  // }, []);

  return (
    <div className="coins-of-game">
      <div className="container high-z-index  ">
        <header className="d-flex justify-content-between mb-4 align-items-center   text-white p-4 ">
          <motion.div
            className="ticket-prize white-container justify-center"
            variants={textVariants}
            initial={"initial"}
            animate={"animate"}
          >
            <motion.img
              src={ticket.src}
              className="ticket mb-3"
              alt="ticket"
              variants={textVariants}
            />
            {/* <motion.h5  variants={textVariants}>{user.coins}</motion.h5> */}
          </motion.div>
          <div className="col-3 ">
            <Title />
          </div>
        </header>
        <Link href="/user" className="link ">
          <div className="rtl  col-11 ms-4 mb-4 ">
            <div className="white-container justify-center">
              <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                {/* {user?.name?.slice(0, 13)} */}
              </h5>
              {/* <img
              src={user.provider == "local" ? apiUrl + user.image : user.image}
              className="userImage circle-image"
              style={{ width: "40px" }}
              alt=""
            /> */}
            </div>
          </div>
        </Link>

        <Link href={""} className="link">
          <div className="row mb-4  coins pointer ">
            <div className="col-9  d-flex align-items-center justify-content-center ">
              <h4>rwan</h4>
            </div>

            <div className="col-3    text-white level">
              <h1> 5 </h1>
              <h6> Play Now </h6>
            </div>
          </div>
        </Link>

        <Link href={""} className="link mt-10">
          <div className="row mb-4  coins pointer ">
            <div className="col-9  d-flex align-items-center justify-content-center ">
              <h4>rwan</h4>
            </div>

            <div className="col-3    text-white level">
              <h1> 5 </h1>
              <h6> Play Now </h6>
            </div>
          </div>
        </Link>

        <Link href={""} className="link mt-10">
          <div className="row mb-4  coins pointer ">
            <div className="col-9  d-flex align-items-center justify-content-center ">
              <h4>rwan</h4>
            </div>

            <div className="col-3    text-white level">
              <h1> 5 </h1>
              <h6> Play Now </h6>
            </div>
          </div>
        </Link>
      </div>

      <div className="   high-z-index ">
        <Footer />
      </div>
    </div>
  );
};

export default coinsOfGame;
