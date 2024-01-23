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
import { TbLanguage } from "react-icons/tb";

// import ChooseLanguage from "@/components/chooseLanguage/Chooselanguage";

const user = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
    return () => {};
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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

          <div className="col-3 d-flex align-items-center justify-content-center ">
            <img src={settingImage.src}   style={{width:'55px' , height:'55px'}} 
                       onClick={toggleEditMode} alt="settings" className="pointer" />
                       <TbLanguage className="text-white" />

          </div>
        </div>
        <div className="container p-4">
        {editMode ? (
              <div className="d-flex align-items-center justify-content-center rtl mt-4 ">
              <div className="w-full max-w-xs ">
                <div
                  // onSubmit={formik.handleSubmit}
                  className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  style={{ background: "var(--purple-color)" }}
                >
                  <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">
تعديل البيانات                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أدخل Name"
                      value={user?.name} 
                    />

                    {/* {formik.touched.id && formik.errors.id ? (
                      <div className="text-red-500">
                        {formik.errors.id}
                      </div>
                    ) : null} */}
                  </div>
                  <div className="edit-btn d-flex align-items-center justify-content-center border-radius-20 m-2 transform-btn pointer">
                    <button className="text-white"  >
                 تعديل     
                    </button>
                  </div>
                </div>
                <h6  onClick={toggleEditMode} className="text-center text-white pointer  ">
                 العوده للصفحة السابقة
                </h6>
              </div>
            </div>
 
) : (
  <>
    <div className="user-info rtl d-flex align-items-center mb-2 mt-10">
      <img
        src={
          user?.provider === "local"
            ? apiUrl + user?.image
            : user?.image || userImage.src
        }
        className=""
        alt="user"
      />
      <h2 className="text-white ms-4">
        {user?.name || "user not found"}
      </h2>
    </div>
    <div className="user-score rtl mb-4 d-flex text-white justify-content-between text-center">
      <h2>مجموع البارايات التي فزت بها</h2>
      <h2>{user?.winning}</h2>
    </div>
    <div className="user-score rtl mb-4 d-flex text-white justify-content-between text-center">
      <h2>النقود</h2>
      <h2>{user?.coins}</h2>
    </div>
    <div className="user-score rtl mb-4 d-flex text-white justify-content-between text-center">
      <h2> المستوي</h2>
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
