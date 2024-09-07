import { useFormik } from "formik";
import Api from "@/config/api";
import { notifyError, notifySuccess } from "@/components/toastify/toastify";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/redux/slices/user";
import {
  changePasswordValidationSchema,
  editUserDataValidationSchema,
} from "@/utils/validation";
changePasswordValidationSchema;
const EditUser = ({ toggleEditMode }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const provider = user?.provider;
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

  const [intialState, setInitialState] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: null,
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
        toggleEditMode();
        formik.resetForm();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }

  const [intialPassword, setInitialPassword] = useState({
    password: "",
    rePassword: "",
    oldPassword: "",
  });
  
  function handlePasswordSubmit(values) {
    console.log(values);

    Api.post("/users/password", values)
      .then(() => {
        notifySuccess("Password Updated !! ");
        dispatch(fetchUserData());
        toggleEditMode();
        formik.resetForm();
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        notifyError(Array.isArray(error) ? error[0] : error);
      });
  }
 const formikPassword = useFormik({
    initialValues: intialPassword,
    validationSchema: changePasswordValidationSchema,
    onSubmit: handlePasswordSubmit,
  });

  const formik = useFormik({
    initialValues: intialState,
    validationSchema: editUserDataValidationSchema,
    onSubmit: handleInfoSubmit,
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

              {/* <label className="text-white">{t("user.name")} </label> */}
              <input
                type="text"
                className={`form-control mt-1 mb-2 ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                name="name"
                placeholder={t("user.name")}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
              {/* <label className="text-white">{t("user.phone")} </label> */}
              <input
                type="text"
                className={`form-control  mt-1 mb-2 ${
                  formik.touched.phone && formik.errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                name="phone"
                placeholder={t("user.phone")}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              )}

              {provider === "local" && (
                <>
                  {" "}
                  {/* <label className="text-white">{t("user.email")} </label> */}
                  <input
                    type="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    name="email"
                    placeholder={t("user.email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </>
              )}
              <button
                type="submit"
                className="d-flex mt-2 mb-1 align-items-center justify-content-center edit-btn text-white border-radius-20   pointer"
              >
                {" "}
                {t("user.change")}
              </button>
            </form>

            <form onSubmit={formikPassword.handleSubmit}>
              {provider === "local" && (
                <>
                  <span className=" fs-5 block text-white text-sm font-bold mb-1 text-center">
                    {t("user.changePassword")}{" "}
                  </span>
                  {/* <label className="text-white">
                    {t("user.oldPassword")}
                  </label> */}
                  <input
                    type="password"
                    className={`form-control  mt-1 mb-2 ${
                      formikPassword.touched.oldPassword &&
                      formikPassword.errors.oldPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    name="oldPassword"
                    placeholder={t("user.oldPassword")}
                    value={formikPassword.values.oldPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    required
                  />
                  {formikPassword.touched.oldPassword &&
                    formikPassword.errors.oldPassword && (
                      <div className="invalid-feedback">
                        {formikPassword.errors.oldPassword}
                      </div>
                    )}

                  {/* <label className="text-white">{t("user.password")}</label> */}
                  <input
                    type="password"
                    className={`form-control  mt-1 mb-2 ${
                      formikPassword.touched.password &&
                      formikPassword.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    name="password"
                    placeholder={t("user.password")}
                    value={formikPassword.values.password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    required
                  />
                  {formikPassword.touched.password &&
                    formikPassword.errors.password && (
                      <div className="invalid-feedback">
                        {formikPassword.errors.password}
                      </div>
                    )}
                  {/* <label className="text-white">{t("user.rePassword")}</label> */}
                  <input
                    type="password"
                    className={`form-control ${
                      formikPassword.touched.rePassword &&
                      formikPassword.errors.rePassword
                        ? "is-invalid"
                        : ""
                    }`}
                    id="validationServer03"
                    aria-describedby="validationServer03Feedback"
                    name="rePassword"
                    placeholder={t("user.rePassword")}
                    value={formikPassword.values.rePassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    required
                  />
                  {formikPassword.touched.rePassword &&
                    formikPassword.errors.rePassword && (
                      <div className="invalid-feedback">
                        {formikPassword.errors.rePassword}
                      </div>
                    )}

                  <button
                    type="submit"
                    className="mt-2 mb-1 d-flex align-items-center justify-content-center edit-btn text-white border-radius-20  pointer"
                  >
                    {t("user.changePassword")}
                  </button>
                </>
              )}
            </form>
          </div>

          {/* <h6
            onClick={toggleEditMode}
            className="text-center text-white pointer  "
          >
            {t("user.return")}
          </h6> */}
        </div>
      </div> 
    </>
  );
};

export default EditUser;
