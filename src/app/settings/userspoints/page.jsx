"use client";
import "./usersPoints.scss";
import bg1 from "../../../assets/photos/bg1.png";
import bg2 from "../../../assets/photos/bg2.png";
import { useEffect, useState } from "react";
import LevelModal from "@/components/LevelModal/LevelModal";
import { useDispatch, useSelector } from "react-redux";
import { fetcLevels } from "@/redux/slices/levels";

const usersPoints = () => {
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.levels.data);
  useEffect(() => {
    dispatch(fetcLevels());
  }, []);
  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });
  return (
    <>
      <div className="users-points rtl">
        <div className="container">
          <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
            <h5> المستوايات</h5>
            <h5>النقاط المطلوبة </h5>
            <h5>الخلفية </h5>
            <h5>لون x /o </h5>
            <button
              className="fw-bold transform-btn "
              onClick={() => setModal({ ...modal, open: true })}
            >
              اضافة مستوي
            </button>
          </div>
          <div className="row pt-4">
            {levels.map((ele, ind) => (
              <div key={ind}>
                <div
                  key={ind}
                  className=" col-12 d-flex align-items-center justify-content-around  text-white "
                >
                  <p>المستوي {ele.number} </p>
                  <p>{ele.coins}</p>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: ele.bg,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: ele.color,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <button
                    className="edit-btn fw-bold transform-btn "
                    onClick={() =>
                      setModal({ data: ele, open: true, update: true })
                    }
                  >
                    تعديل
                  </button>
                </div>
                <hr className="text-white  p-4 mt-1 " />
              </div>
            ))}
          </div>
        </div>
      </div>
      <LevelModal
        data={modal.data}
        handleClose={handleClose}
        open={modal.open}
        update={modal.update}
      />
    </>
  );
};

export default usersPoints;
