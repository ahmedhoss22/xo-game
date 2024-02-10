"use client";
import "./user.scss";
import Footer from "@/components/footer/Footer";
import settingImage from "@/assets/photos/Settings.png";
import userImage from "@/assets/photos/girl-icon-user.png";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "@/components/title/Title";
import { useTranslation } from "react-i18next";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";
import EditUser from "@/components/editUser/EditUser";

const user = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data); 
  const provider = user?.provider;
  const [editMode, setEditMode] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

 
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    dispatch(fetchUserData());
    return () => {};
  }, []);

  return (
    <div className=" user ">
      <div className="container ">
        <div className="row d-flex  justify-content-between-lg justify-content-around pt-4">
          <div className="col-1" onClick={() => router.push("/")}>
            <FaArrowLeft className="text-white pointer h-5 arrow mt-10" />
          </div>

          <div className="col-6">
            <Title />
          </div>
          <div className="col-lg-2 col-5 d-flex align-items-center justify-content-center ">
            <ChooseLanguage />{" "}
            <img
              src={settingImage.src}
              style={{ width: "55px", height: "55px" }}
              onClick={toggleEditMode}
              alt="settings"
              className="pointer"
            />
          </div>
        </div>
        <div className="container p-4">
          {editMode ? (
          <EditUser 
          toggleEditMode={toggleEditMode}/>
          ) : (
            <>
              <div
                className={`user-info  d-flex align-items-center mb-2 mt-10   rtl   }`}
              >
                <img
                  src={
                       provider === "local"
                      ? apiUrl + user?.image
                      : user?.image || userImage.src
                  }
                  alt="user"
                />
                <h2 className="text-white ms-4">
                  {user?.name || "user not found"}
                </h2>
              </div>
              <div
                className={`user-score  mb-4 d-flex text-white justify-content-between text-center ${
                  i18n.language === "ar" ? "rtl" : ""
                }`}
              >
                <h2>{t("user.total")}</h2>
                <h2>{user?.winning}</h2>
              </div>
              <div
                className={`user-score  mb-4 d-flex text-white justify-content-between text-center  ${
                  i18n.language === "ar" ? "rtl" : ""
                }`}
              >
                <h2>{t("user.coins")}</h2>
                <h2>{user?.coins}</h2>
              </div>
              <div
                className={`user-score  mb-4 d-flex text-white justify-content-between text-center  ${
                  i18n.language === "ar" ? "rtl" : ""
                }`}
              >
                <h2>{t("user.level")}</h2>
                <h2>{user?.level}</h2>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default user;
