"use client";
import Footer from "@/components/footer/Footer";
import "./changeStore.scss";
import Link from "next/link";
import ticket from "../../assets/photos/Ticket.png";
import img from "../../assets/photos/bg3.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";
import { Button, Card } from "react-bootstrap";

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

const changeStore = () => {
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
    <div className="change-store d-flex flex-column ">
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
    
          <div className="row rtl text-center d-flex align-items-center justify-content-center">
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
              <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
            <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
            <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
            <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>{" "}
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
            <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>{" "}
            <div className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 ">
            <Card
                style={{
                  width: "15rem",
                  height: "18rem",
                  background: "#37007B ",
                  color: "white",
                }}
              >
                <Card.Img
                  variant="top"
                  src={img.src}
                  style={{ height: "10rem" }}
                />
                <Card.Body>
                  <Card.Title>الاسم </Card.Title>
                  <Card.Text className="d-flex align-items-center justify-content-center gap-2"> 2000 <img src={ticket.src} alt="" /></Card.Text>
                  <Button className="w-100 transform-btn ">
                    استبدال الأن{" "}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>

          <Link href={""} className="link mt-10"></Link>
        </div>
      </div>

      <div className="   high-z-index ">
        <Footer />
      </div>
    </div>
  );
};

export default changeStore;
