"use client";

import Footer from "@/components/footer/Footer";
import "./playWith.scss";
import Link from "next/link";
import ticket from "@/assets/photos/Ticket.png";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import Title from "@/components/title/Title";
import userImage from "@/assets/photos/userrr.png";
import SoundBg from "@/components/soundBg/SoundBg";
import PlaygroundLoading from "../../(private_route)/playgroundloading/page";
import { useFormik } from "formik";
import * as Yup from 'yup';

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

const playWith = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const { online, data } = useSelector((state) => state.user);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
  const playingCoins = useSelector((state) => state.playingCoins.data);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const loading = useSelector((state) => state.loading.isLoading);
  const router = useRouter();
  const [initialState, setInitialState] = useState({
    joinId: '',
  });

  const validationSchema = Yup.object({
    joinId: Yup.number().required('يجب إدخال رقم الغرفة').positive('يجب إدخال رقم إيجابي'),
  });
 

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,  
    onSubmit: handleSubmit,
  });

  function handleSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <>
      {loading ? (
        <PlaygroundLoading
        // text="جاري الحصول على بيانات الغرفة"
        // close={true}
        // handleClose={handleClose}
        />
      ) : (
        <div className="play-with d-flex flex-column ">
          <SoundBg />
          <div className="flex-grow">
            <div className="container high-z-index  ">
              <header className="d-flex justify-content-between-lg justify-content-around   mb-4 align-items-center   text-white p-4 mt-2 ">
                <motion.div
                  className="ticket-container justify-center"
                  variants={textVariants}
                  initial={"initial"}
                  animate={"animate"}
                >
                  <motion.img
                    src={ticket.src}
                    className="ticket"
                    alt="ticket"
                    variants={textVariants}
                  />
                  <motion.div className="ticket-prize " variants={textVariants}>
                    <motion.h5>{user.coins}</motion.h5>
                  </motion.div>
                </motion.div>
                <div className="col-3">
                  <Title />
                </div>
              </header>
              <Link href="/user" className="link ">
                <div className="rtl  col-11 ms-4 mb-1 ">
                  <div className="user-container justify-center">
                    <h5
                      className="text-white mt-1 "
                      style={{ fontSize: "15px" }}
                    >
                      {user?.name?.slice(0, 13) || "user not found"}
                    </h5>
                    <img
                      src={
                        user.provider == "local"
                          ? apiUrl + user?.image
                          : user.image || userImage.src
                      }
                      className="userImage circle-image"
                      alt="user image"
                    />
                  </div>
                </div>
              </Link>
              <div className="d-flex align-items-center justify-content-center rtl mt-4 ">
                <div className="w-full max-w-xs ">
                <form onSubmit={formik.handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ background: "var(--purple-color)" }}>
  <div className="mb-4">
    <label className="block text-white text-sm font-bold mb-2">
      ألانضمام الي الغرفة الان
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="joinId"
      name="joinId"
      type="number"
      placeholder="أدخل ID"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.joinId}
    />
    {formik.touched.joinId && formik.errors.joinId ? (
      <div className="text-red-500">{formik.errors.joinId}</div>
    ) : null}
  </div>
  <div className="create-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
    <button className="text-white" type="submit">
      الانضمام
    </button>
  </div>
</form>

                  <Link href={"/playground"} className="link ">
                    <h6 className="text-center text-white  ">
                      أنشاء غرفة الأن
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="   high-z-index ">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default playWith;
