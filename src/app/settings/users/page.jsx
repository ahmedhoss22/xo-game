"use client";
import "./users.scss";
import Box from "@mui/material/Box"; 
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";

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

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const handleOpenCreateUser = () => setOpenCreateUser(true);
  const handleCloseCreateUser = () => setOpenCreateUser(false);

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

        <button className="text-white col-md-2 transform-btn  "              
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
          <div className="row rtl ">
            <h2 className="text-center"> تعديل بيانات المستخدم</h2>

            <TextField
              className="mb-4"
              id="userName"
              label="الأسم"
              variant="outlined"
            />
            <TextField
              className="mb-4"
              id="email"
              label="الأيميل"
              variant="outlined"
            />

            <TextField
              className="mb-4"
              id="mobile"
              label="رقم الهاتف"
              variant="outlined"
            />
            <TextField
              className="mb-4"
              id="wallet"
              label="المحفظة "
              variant="outlined"
            />
            <button className="   fw-bold transform-btn  green-bg pt-2 pb-2 text-white ">تعديل</button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openCreateUser}
        onClose={handleCloseCreateUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row rtl ">
            <h2 className="text-center"> أنشاء مستخدم</h2>

            <TextField
              className="mb-4"
              id="userName"
              label="الأسم"
              variant="outlined"
            />
            <TextField
              className="mb-4"
              id="email"
              label="الأيميل"
              variant="outlined"
            />

            <TextField
              className="mb-4"
              id="mobile"
              label="رقم الهاتف"
              variant="outlined"
            />
            <TextField
              className="mb-4"
              id="wallet"
              label="المحفظة "
              variant="outlined"
            />
            <button className="   fw-bold transform-btn  green-bg pt-2 pb-2 text-white ">أنشاء</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default users;
