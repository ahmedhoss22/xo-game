"use client";

import "./user.scss";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import settingImage from "../../assets/photos/Settings.png";
import userImage from "../../assets/photos/girl-icon-user.png";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const user = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchUserData());
    return () => {};
  }, []);

  // const apiUrl = process.env.NEXT_PUBLIC_API_SERVER

  return (
    <div className=" user ">
      <div className="container ">
        <div className="row d-flex justify-content-between pt-4">
          <div className="col-1" onClick={()=>router.push("/")}>
            <FaArrowLeft className="text-white pointer h-5 arrow" />
          </div>

          <div className="col-6">
            <Title />
          </div>

          <div className="col-lg-3 col-md-4 ">
            <ChooseLanguage />
          </div>
          <div className="col-1">
            <img src={settingImage.src} alt="settings" />
          </div>
        </div>
<div className="user-info rtl    d-flex  align-items-center mb-2 mt-10  ">
<img src={user.image} className="" alt="user" />
          <h2 className="text-white ms-4">{user.name}</h2>
        </div>
                <div className="user-score rtl mb-4  d-flex text-white justify-content-between text-center">

          <h2>مجموع البارايات التي فزت بها</h2>
          <h2>{user.winning}</h2>
        </div>
                <div className="user-score rtl mb-4  d-flex text-white justify-content-between text-center">

          <h2>النقود</h2>
          <h2>{user.coins}</h2>
        </div>
                <div className="user-score rtl mb-4  d-flex text-white justify-content-between text-center">

          <h2> المستوي</h2>
          <h2>{user.level}</h2>
        </div>
        {/*         <div className="user-score rtl mb-4  d-flex text-white justify-content-between text-center">

          <h2>المستوي</h2>
          <h2>0</h2>
        </div> */}
        {/* </div> */}
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default user;
