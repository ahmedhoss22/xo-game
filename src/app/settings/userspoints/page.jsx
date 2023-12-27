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

        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                    المستوايات
                    </th>

                             <th scope="col" className="px-6 py-3">
            النقاط المطلوبة 
                    </th>
                    <th scope="col" className="px-6 py-3">
                    الخلفية
                    </th>

                    <th scope="col" className="px-6 py-3">
                    لون x /o                     </th>
                    
                    <th scope="col" className="px-6 py-3">
                    <button
              className="fw-bold transform-btn "
              onClick={() => setModal({ ...modal, open: true })}
            >
              اضافة مستوي
            </button>                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                {levels.map((ele, ind) => (

                  <tr  key={ind} className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer">
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    المستوي {ele.number}  
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    {ele.coins}
                    </td>
                    <td className="d-flex align-items-center justify-content-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    <div 
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: ele.bg,
                      borderRadius: "50%",
                    }}
                  ></div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    <div
                    
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: ele.color,
                      borderRadius: "50%",
                    }}
                  ></div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                    <button
                    className="edit-btn fw-bold transform-btn "
                    onClick={() =>
                      setModal({ data: ele, open: true, update: true })
                    }
                  >
                    تعديل
                  </button>
                    </td>
                  </tr>)
                  )}
                  
                </tbody>
              </table>
            </div>
          </div>
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
