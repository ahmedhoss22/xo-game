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
import { FaUserAlt } from "react-icons/fa";
import { MdNotStarted } from "react-icons/md";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";

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
  const user = useSelector((state) => state.user.data);
  const online = useSelector((state) => state.user.online);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const playingCoins = useSelector((state) => state.playingCoins.data);

  useEffect(() => {
    dispatch(fetchPlayingCoins());
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    // if (!online) {
    //   router.push("/login");
    // } else {
    //   router.push("/coinsofgame");
    // }
  }, []);

  return (
    <div className="coins-of-game d-flex flex-column ">
      <div className="flex-grow">
        <div className="container high-z-index  ">
          <header className="d-flex justify-content-between mb-4 align-items-center   text-white p-4 ">
            <motion.div
              className="ticket-prize ticket-container justify-center"
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
              <motion.h5 variants={textVariants}>{user.coins}</motion.h5>
            </motion.div>
            <div className="col-3 ">
              <Title />
            </div>
          </header>
          <Link href="/user" className="link">
            <div className="rtl  col-11 ms-4 mb-1 ">
              <div className="user-container justify-center">
                <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                  {user?.name?.slice(0, 13)}
                </h5>
                <img
                  src={
                    user.provider == "local" ? apiUrl + user.image : user.image
                  }
                  className="userImage circle-image"
                  alt="user image"
                />
              </div>
            </div>
          </Link>
          <Link href={""} className="link mt-10">
            <div className="row mb-4  start-play ">
              {playingCoins.map((ele, ind) => (
                <div key={ele._id} className="col-lg-6 gy-4 d-flex">
                  <div className="col-9 p-2 start-play-div1   ">
                    <div className="d-flex align-items-center">
                      <MdNotStarted
                        style={{ fontSize: "50px", color: " purple" }}
                      />
                      <h4>{ele.name}</h4>
                    </div>
                    <p>ألعب مع ناس محترفين وأثبت نفسك .</p>

                    <div className="border-bottom-div d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-1 align-items-center text-secondary  ">
                        <FaUserAlt className="fs-6 mb-3" />
                        <p>2 </p>
                      </div>
                      <div className="d-flex gap-1 align-items-center text-secondary  ">
                        <img
                          src={ticket.src}
                          alt="tickets"
                          className="fs-6 mb-3"
                        />
                        <p>{ele.coins} الدخول</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-3    text-white start-play-div2">
                    <h1> {ele.winCoins } </h1>
                    <h6> ألعب الان</h6>
                  </div>
                </div>
              ))} 
            </div>
          </Link>
        </div>
      </div>

      <div className="   high-z-index ">
        <Footer />
      </div>
    </div>
  );
};

export default coinsOfGame;
