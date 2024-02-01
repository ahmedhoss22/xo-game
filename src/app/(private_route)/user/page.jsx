"use client";

import "./user.scss";
import Footer from "@/components/footer/Footer";
import settingImage from "../../../assets/photos/Settings.png";
import userImage from "../../../assets/photos/girl-icon-user.png";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "@/components/title/Title";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import ChooseLanguage from "@/components/chooseLanguage/ChooseLanguage";

const user = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [editMode, setEditMode] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const [intialState, setInitialState] = useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    image: null,
  });

  function handleSubmit(values) {
    console.log(image);
    console.log(values);
    const url = "/users/user/update";
    Api.post(url, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        notifySuccess("Data submitted");
        dispatch(fetchUserData());
        toggleEditMode(); // Close edit mode
        formik.resetForm();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }
  const formik = useFormik({
    initialValues: intialState,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (editMode && user) {
      setInitialState(user);
      formik.setValues(user);
    }
  }, [editMode, user]);

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
            <div
              className={`d-flex align-items-center justify-content-center  mt-2  ${
                i18n.language === "ar" ? "rtl" : ""
              }`}
            >
              <div className="w-full max-w-xs ">
                <form
                  onSubmit={formik.handleSubmit}
                  className="shadow-md rounded px-8 pt-2 pb-3 mb-2"
                  style={{ background: "var(--purple-color)" }}
                >
                  <div className="mb-4">
                    <span className=" fs-5 block text-white text-sm font-bold mb-1 text-center">
                      {t("user.edit")}{" "}
                    </span>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />{" "}
                    <div className="d-flex align-items-center justify-content-center">
                      <label htmlFor="image"  >
           
                          <img
                          src={
                            formik.values.image instanceof File
                              ? URL.createObjectURL(formik.values.image)
                              : user?.provider === "local"
                              ? apiUrl + user?.image
                              : user?.image || userImage.src
                          }
                        
                          style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid white',
                            borderRadius: '50px' ,
                          }}
                          alt="profile"
                          className="pointer"
                  
                        />
            
                      
                      </label>
                    </div>
                    <label className="text-white">{t("user.name")} </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t("user.name")}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      initialValues={user?.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500">{formik.errors.name}</div>
                    ) : null}
                    <label className="text-white">{t("user.email")} </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      name="email"
                      type="text"
                      placeholder={t("user.email")}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      initialValues={user?.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                    <label className="text-white">
                      {t("user.oldPassword")}{" "}
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      placeholder={t("user.oldPassword")}
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      initialValues={user?.oldPassword}
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword ? (
                      <div className="text-red-500">
                        {formik.errors.oldPassword}
                      </div>
                    ) : null}
                    <label className="text-white">{t("user.password")} </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 mt-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t("user.password")}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      initialValues={user?.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="d-flex align-items-center justify-content-center ">
           
                        <button type="submit" className="edit-btn text-white border-radius-20 m-2 transform-btn pointer">       {t("user.change")}
                    </button>
                  </div>
                </form>
                <h6
                  onClick={toggleEditMode}
                  className="text-center text-white pointer  "
                >
                  {t("user.return")}{" "}
                </h6>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`user-info  d-flex align-items-center mb-2 mt-10${
                  i18n.language === "ar" ? "rtl" : ""
                }`}
              >
                <img
                  src={
                    user?.provider === "local"
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
