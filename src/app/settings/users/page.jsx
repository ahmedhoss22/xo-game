"use client";
import "./users.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "@/config/api";
import { fetchAllUsersData } from "@/redux/slices/user";
import UsersModal from "@/components/usersModal/UsersModal";

const users = () => {
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.all);
  useEffect(() => {
    dispatch(fetchAllUsersData());
  }, []);

  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });

  async function handleDelete(id) {
    try {
      console.log(id);
      await Api.delete("/users/user/" + id);
      dispatch(fetchAllUsersData());
    } catch (error) {
      console.log(error.message);
    }
  }

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
                      المحفظة
                    </th>

                    <th scope="col" className="px-6 py-3">
                      {" "}
                      عدد مرات الفوز
                    </th>
                    <th scope="col" className="px-6 py-3">
                      الاعدادات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((ele, ind) => (
                    <tr
                      key={ind}
                      className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {ele.name}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {ele.email}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {ele.coins}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {ele.winning}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex gap-5">
                          <button
                            className="edit-btn fw-bold transform-btn  "
                            // onClick={handleOpenEdit}
                            onClick={() =>
                              setModal({ data: ele, open: true, update: true })
                            }
                          >
                            تعديل
                          </button>
                          <button
                            className="delete-btn fw-bold transform-btn "
                            onClick={() => handleDelete(ele._id)}
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button
          className="text-white col-md-2 transform-btn  "
          //onClick={handleOpenCreateUser}
          onClick={() => setModal({ open: true, update: false })}
        >
          أنشاء حساب
        </button>
      </div>

      <UsersModal
        open={modal.open}
        data={modal.data}
        update={modal.update}
        handleClose={handleClose}
      />
    </div>
  );
};

export default users;
