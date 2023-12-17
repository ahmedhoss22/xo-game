"use client";
import "./users.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const users = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  function handleEditUser(values) {
    console.log(values);
  }

  let validationEditUserSchema = Yup.object({
    userName: Yup.string().required("برجاء ادخال اسم المستخدم   ."),
    email: Yup.string().required("برجاء ادخال الايميل   ."),
    mobile: Yup.number().required("برجاء ادخال رقم الهاتف   ."),
    wallet: Yup.number().required("برجاء ادخال  رصيد المحفظة  ."),
  });

  let formikEditUser = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: 0,
      wallet: 0,
    },
    validationEditUserSchema,
    onSubmit: handleEditUser,
  });

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const handleOpenCreateUser = () => setOpenCreateUser(true);
  const handleCloseCreateUser = () => setOpenCreateUser(false);

  function handleCreateUser(values) {
    console.log(values);
  }

  let validationCreateUserSchema = Yup.object({
    userName: Yup.string().required("برجاء ادخال اسم المستخدم   ."),
    email: Yup.string().required("برجاء ادخال الايميل   ."),
    mobile: Yup.number().required("برجاء ادخال رقم الهاتف   ."),
    wallet: Yup.number().required("برجاء ادخال  رصيد المحفظة  ."),
  });

  let formikCreateUser = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: 0,
      wallet: 0,
    },
    validationCreateUserSchema,
    onSubmit: handleCreateUser,
  });

  return (
    <div className="users rtl">
      <div className="container">
        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      اسم المستخدم
                    </th>

                    <th scope="col" className="px-6 py-3">
                      الأيميل
                    </th>
                    <th scope="col" className="px-6 py-3">
                      رقم الهاتف
                    </th>

                    <th scope="col" className="px-6 py-3">
                      المحفظة
                    </th>
                    <th scope="col" className="px-6 py-3">
                      الاعدادات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      روان
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      rwanabdelfattah301@gmail.com
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      01226524775
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      00
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                      <div className="d-flex gap-5">
                        <button
                          className="edit-btn fw-bold transform-btn  "
                          onClick={handleOpenEdit}
                        >
                          تعديل
                        </button>
                        <button className="delete-btn fw-bold transform-btn ">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button
          className="text-white col-md-2 transform-btn  "
          onClick={handleOpenCreateUser}
        >
          أنشاء حساب{" "}
        </button>
      </div>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <form onSubmit={formikEditUser.handleSubmit}>
            <div className="row rtl ">
              <h2 className="text-center"> تعديل بيانات المستخدم</h2>
              {formikEditUser.touched.userName && formikEditUser.errors.userName ? (
                <h4>{formikEditUser.errors.userName}</h4>
              ) : null}
              <TextField
                className="mb-4"
                id="userName"
                name="userName"
                value={formikEditUser.values.userName}
                onChange={formikEditUser.handleChange}
                onBlur={formikEditUser.handleBlur}
                label="الأسم"
                variant="outlined"
              />
              {formikEditUser.touched.email && formikEditUser.errors.email ? (
                <h4>{formikEditUser.errors.email}</h4>
              ) : null}
              <TextField
                className="mb-4"
                id="email"
                name="email"
                value={formikEditUser.values.email}
                onChange={formikEditUser.handleChange}
                onBlur={formikEditUser.handleBlur}
                label="الأيميل"
                variant="outlined"
              />
              {formikEditUser.touched.mobile && formikEditUser.errors.mobile ? (
                <h4>{formikEditUser.errors.mobile}</h4>
              ) : null}
              <TextField
                className="mb-4"
                id="mobile"
                name="mobile"
                value={formikEditUser.values.mobile}
                onChange={formikEditUser.handleChange}
                onBlur={formikEditUser.handleBlur}
                label="رقم الهاتف"
                variant="outlined"
              />
              {formikEditUser.touched.wallet && formikEditUser.errors.wallet ? (
                <h4>{formikEditUser.errors.wallet}</h4>
              ) : null}
              <TextField
                className="mb-4"
                id="wallet"
                name="wallet"
                value={formikEditUser.values.wallet}
                onChange={formikEditUser.handleChange}
                onBlur={formikEditUser.handleBlur}
                label="المحفظة "
                variant="outlined"
              />

              <button
                type="submit"
                className="  fw-bold transform-btn  green-bg pt-2 pb-2 text-white "
              >
                تعديل
              </button>
            </div>{" "}
          </form>
        </Box>
      </Modal>

      <Modal
        open={openCreateUser}
        onClose={handleCloseCreateUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={formikCreateUser.handleSubmit}>
          <div className="row rtl ">
            <h2 className="text-center"> أنشاء مستخدم</h2>
            {formikCreateUser.touched.userName && formikCreateUser.errors.userName ? (
                <h4>{formikCreateUser.errors.userName}</h4>
              ) : null}
            <TextField
              className="mb-4"
              id="userName"
              name="userName"
              value={formikCreateUser.values.userName}
              onChange={formikCreateUser.handleChange}
              onBlur={formikCreateUser.handleBlur}
              label="الأسم"
              variant="outlined"
            />  {formikCreateUser.touched.userName && formikCreateUser.errors.userName ? (
              <h4>{formikCreateUser.errors.userName}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="email"
              name="email"
              value={formikCreateUser.values.email}
              onChange={formikCreateUser.handleChange}
              onBlur={formikCreateUser.handleBlur}
              label="الأيميل"
              variant="outlined"
            />
  {formikCreateUser.touched.userName && formikCreateUser.errors.userName ? (
                <h4>{formikCreateUser.errors.userName}</h4>
              ) : null}
            <TextField
              className="mb-4"
              id="mobile"
              name="mobile"
              value={formikCreateUser.values.mobile}
              onChange={formikCreateUser.handleChange}
              onBlur={formikCreateUser.handleBlur}
              label="رقم الهاتف"
              variant="outlined"
            />  {formikCreateUser.touched.userName && formikCreateUser.errors.userName ? (
              <h4>{formikCreateUser.errors.userName}</h4>
            ) : null}
            <TextField
              className="mb-4"
              id="wallet"
              name="wallet"
              value={formikCreateUser.values.wallet}
              onChange={formikCreateUser.handleChange}
              onBlur={formikCreateUser.handleBlur}
              label="المحفظة "
              variant="outlined"
            />
            <button         type="submit" className="   fw-bold transform-btn  green-bg pt-2 pb-2 text-white ">
              أنشاء
            </button>
          </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default users;
