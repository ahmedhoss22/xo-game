"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./users.scss";
import { fetchAllUsesrData } from "@/redux/slices/user";
import UsersModal from "@/components/usersModal/UsersModal";
import Api from "@/config/api";

const users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.all);
  useEffect(() => {
    dispatch(fetchAllUsesrData());
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
      await Api.delete("/users/user/" + id)
      dispatch(fetchAllUsesrData());
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="users rtl">
        <div className="container">
          <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold overflow-x-auto relative">
            <h5>أسم المستخدم</h5>
            <h5>الأيميل </h5>
            <h5>المحفظة</h5>
            <h5>عدد مرات الفوز </h5>
            <h5>الأعدادت </h5>
          </div>
          <div className="row pt-4 overflow-x-auto relative">
            {users.map((ele, ind) => (
              <>
                <div
                  key={ind}
                  className=" col-12 d-flex align-items-center justify-content-around  text-white "
                >
                  <p style={{ textAlign: "center", width: "50%" }}>
                    {ele.name}
                  </p>
                  <p style={{ textAlign: "center", width: "50%" }}>
                    {ele.email}{" "}
                  </p>
                  <p style={{ textAlign: "center", width: "50%" }}>
                    {ele.coins}{" "}
                  </p>
                  <p style={{ textAlign: "center", width: "50%" }}>
                    {ele.winning}{" "}
                  </p>
                  <div className="d-flex gap-5">
                    <button
                      className="edit-btn fw-bold transform-btn "
                      onClick={() =>
                        setModal({ data: ele, open: true, update: true })
                      }
                    >
                      تعديل
                    </button>
                    <button className="delete-btn fw-bold transform-btn " onClick={()=>handleDelete(ele._id)}>
                      حذف
                    </button>
                  </div>
                </div>
                <hr className="text-white  p-4 mt-1 " />
              </>
            ))}
          </div>
          <button
            className="text-white col-md-2 transform-btn"
            onClick={() => setModal({ open: true, update: false })}
          >
            أنشاء حساب{" "}
          </button>
        </div>
      </div>
      <UsersModal
        open={modal.open}
        data={modal.data}
        update={modal.update}
        handleClose={handleClose}
      />
    </>
  );
};

export default users;
