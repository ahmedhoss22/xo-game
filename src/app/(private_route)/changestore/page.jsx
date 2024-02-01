"use client";
import Footer from "@/components/footer/Footer";
import Title from "@/components/title/Title";
import "./changeStore.scss";
import Link from "next/link";
import ticket from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";
import { Button, Card } from "react-bootstrap";
import userImage from "@/assets/photos/userrr.png";
import { getAllItems } from "@/redux/slices/storeSlice";
import OrderModel from "@/components/orderModal/orderModal";
import { useTranslation } from "react-i18next";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
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
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const items = useSelector((state) => state.storeSlice.items);
  const user = useSelector((state) => state.user.data);
  const online = useSelector((state) => state.user.online);  
  const playingCoins = useSelector((state) => state.playingCoins.data);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;


  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });


  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  useEffect(() => {
    dispatch(fetchPlayingCoins());
  }, []);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

 

  return (
    <div className="change-store d-flex flex-column ">
      <div className="flex-grow">
        <div className="container high-z-index  ">
          <header className="d-flex justify-content-between-lg justify-content-around mb-4 align-items-center   text-white p-4 ">
          <div className="d-flex gap-1 align-items-center justify-content-center">
     
  <div >  <ChooseLanguage /></div>
           <motion.div
              className="ticket-container justify-center"
              variants={textVariants}
              initial={"initial"}
              animate={"animate"}
            >
              <motion.img
                src={dollar.src}
                className="ticket"
                alt="ticket"
                variants={textVariants}
              />
              <motion.div className="ticket-prize " variants={textVariants}>
                <motion.h5>{user.coins} </motion.h5>
              </motion.div>
            </motion.div>
       </div>
   
            <div className="col-3 ">
              <Title />
            </div>
          </header>
          <Link href="/user" className="link">
            <div className="rtl  col-11 ms-4 mb-1 ">
              <div className="user-container justify-center">
                <h5 className="text-white mt-1 " style={{ fontSize: "15px" }}>
                  {user?.name?.slice(0, 13) || "user not found"}
                </h5>
                <img
                  src={
                    user.provider == "local"
                      ? apiUrl + user?.image
                      : user?.image || userImage.src
                  }
                  className="userImage circle-image"
                  alt="user image"
                />
              </div>
            </div>
          </Link>

          <div className="row rtl text-center d-flex align-items-center justify-content-center">
            {items.map((item, key) => (
              <div
                key={key}
                className="col-lg-2  col-md-4 d-flex align-items-center justify-content-center mb-3 "
              >
                <Card
                  style={{
                    width: "15rem",
                    height: "21rem",
                    background: "#37007B ",
                    color: "white",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={apiUrl + item?.image}
                    style={{ height: "12rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{item?.name} </Card.Title>
                    <Card.Text className="d-flex align-items-center justify-content-center gap-2">
                      {" "}
                      {item?.cost} <img src={dollar.src} style={{width:'28px' , height:'28px'}} alt="" />
                    </Card.Text>
                    <Button
                      onClick={() => setModal({ open: true,  data:item})} 
                      className="w-100 transform-btn "
                    >
               {t("changeStore.change")}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <Link href={""} className="link mt-10"></Link>
        </div>
      </div>

      <div className="   high-z-index ">
        <Footer />
      </div>
      < OrderModel
        open={modal.open}
        data={modal.data} 
        handleClose={handleClose}
      />
    </div>
  );
};

export default changeStore;
