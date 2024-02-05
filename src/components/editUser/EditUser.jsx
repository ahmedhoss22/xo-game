import { useFormik } from "formik";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";

const EditUser = ({ toggleEditMode }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const provider = user?.provider;
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const [intialState, setInitialState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    image: null,
  });

  const [intialPassword, setInitialPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  useEffect(() => {
    if (user) {
      setInitialState(user);
      formik.setValues(user);
    }
  }, [user]);

  function handleInfoSubmit(values) { 
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

  function handlePasswordSubmit(values) {
    console.log(values);
    if (values.newPassword !== values.confirmPassword) {
      return notifyError("Password must be same");
    }
    // Api.patch("/user/password",values)
    // .then(()=>{
    //   dispatch(fetchUserData())
    //   setChangeInput(false)
    //   notifySuccess("Account updated !!")
    // })
    // .catch((error)=>{
    //   let errorMsg = error?.response?.data?.message || error?.response?.data?.error
    //   notifyError(errorMsg)
    // })
  }

  const formik = useFormik({
    initialValues: intialState,
    onSubmit: handleInfoSubmit,
  });

  const formikPassword = useFormik({
    initialValues: intialPassword,
    onSubmit: handlePasswordSubmit,
  });

  useEffect(() => {
    dispatch(fetchUserData());
    return () => {};
  }, []);

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center    ${
          i18n.language === "ar" ? "rtl" : ""
        }`}
      >
        <div className="w-full max-w-xs ">
          <div
            className="  shadow-md rounded px-8 pt-1 pb-1"
            style={{ background: "var(--purple-color)" }}
          >
            <span className=" fs-5 block text-white text-sm font-bold mb-1 text-center">
              {t("user.edit")}{" "}
            </span>
            <form onSubmit={formik.handleSubmit}>
              {provider === "local" && (
                <>
                  {" "}
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />{" "}
                  <div className="d-flex align-items-center justify-content-center">
                    <label htmlFor="image">
                      <img
                        src={
                          formik.values.image instanceof File
                            ? URL.createObjectURL(formik.values.image)
                            : user?.provider === "local"
                            ? apiUrl + user?.image
                            : user?.image || userImage.src
                        }
                        style={{
                          width: "46px",
                          height: "46px",
                          border: "1px solid white",
                          borderRadius: "50px",
                        }}
                        alt="profile"
                        className="pointer  "
                      />
                    </label>
                  </div>
                </>
              )}

              <label className="text-white">{t("user.name")} </label>
              <input
                className="shadow appearance-none border rounded w-full py-2  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                placeholder={t("user.name")}
                value={formik?.values?.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}

              {provider === "local" && (
                <>
                  {" "}
                  <label className="text-white">{t("user.email")} </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2   px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    placeholder={t("user.email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    initialValues={user?.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                  <button
                    type="submit"
                    className="d-flex align-items-center justify-content-center edit-btn text-white border-radius-20   pointer"
                  >
                    {" "}
                    {t("user.change")}
                  </button>{" "}
                </>
              )}
            </form>

            <form onSubmit={formikPassword.handleSubmit}>
              {provider === "local" && (
                <>
                  <label className="text-white">{t("user.oldPassword")}</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    placeholder={t("user.oldPassword")}
                    value={formikPassword.values.oldPassword}
                    onChange={formikPassword.handleChange}
                  />
                  {formikPassword.touched.oldPassword &&
                    formikPassword.errors.oldPassword && (
                      <div className="text-red-500">
                        {formikPassword.errors.oldPassword}
                      </div>
                    )}
                  <label className="text-white">{t("user.newPassword")}</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder={t("user.newPassword")}
                    value={formikPassword.values.newPassword}
                    onChange={formikPassword.handleChange}
                  />
                  {formikPassword.touched.confirmPassword &&
                    formikPassword.errors.confirmPassword && (
                      <div className="text-red-500">
                        {formikPassword.errors.confirmPassword}
                      </div>
                    )}
                  <label className="text-white">
                    {t("user.confirmPassword")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder={t("user.confirmPassword")}
                    value={formikPassword.values.confirmPassword}
                    onChange={formikPassword.handleChange}
                  />
                  {formikPassword.touched.confirmPassword &&
                    formikPassword.errors.confirmPassword && (
                      <div className="text-red-500">
                        {formikPassword.errors.confirmPassword}
                      </div>
                    )}
                  <button
                    type="submit"
                    className="d-flex align-items-center justify-content-center edit-btn text-white border-radius-20  mb-1  pointer"
                  >
                    {t("user.changePassword")}
                  </button>
                </>
              )}
            </form>
          </div>

          <h6
            onClick={toggleEditMode}
            className="text-center text-white pointer  "
          >
            {t("user.return")}{" "}
          </h6>
        </div>
      </div>
    </>
  );
};

export default EditUser;
