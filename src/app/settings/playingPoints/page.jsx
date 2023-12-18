"use client";
import "./playingPoints.scss"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLevels } from "@/redux/slices/levels";
import PlayingCoinsModal from "@/components/PlayingCoinsModal/PlayingCoinsModal";
import { fetchPlayingCoins } from "@/redux/slices/playingCoins";

const PlayingPoints = () => {
  const dispatch = useDispatch();
  const playingCoins = useSelector((state) => state.playingCoins.data);

  useEffect(() => {
    dispatch(fetchPlayingCoins());
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
                        نقاط الدخول{" "}
                      </th>

                      <th scope="col" className="px-6 py-3">
                        نقاط الفوز
                      </th>

                      <th scope="col" className="px-6 py-3">
                        عدد المحاولات{" "}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <button
                          className="fw-bold transform-btn "
                          onClick={() => setModal({ ...modal, open: true })}
                        >
                          اضافة مستوي
                        </button>{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {playingCoins.map((ele, ind) => (
                      <tr
                        key={ind}
                        className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                          {ele.coins}{" "}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                          {ele.winCoins}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                          {ele.rounds}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayingCoinsModal
        data={modal.data}
        handleClose={handleClose}
        open={modal.open}
        update={modal.update}
      />
    </>
  );
};

export default PlayingPoints;
