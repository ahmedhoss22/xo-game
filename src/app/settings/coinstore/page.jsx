"use client";
import "./coinStore.scss";
import tickets from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import CoinStoreModel from "@/components/coinStoreModel/CoinStoreModel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "@/redux/slices/coinStoreSlice";
import { PiCoinsDuotone } from "react-icons/pi";

const coinStore = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.coinStoreSlice.items);
console.log(items);
  useEffect(() => {
    dispatch(getAllItems());
  }, []);
  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });

  async function handleDelete(id) {
    await dispatch(deleteItem(id));
    dispatch(getAllItems());
  }

  return (
    <div className="coins-store rtl">
      <div className="container">
        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      التوكينز{" "}
                    </th>

                    <th scope="col" className="px-6 py-3">
                      <button
                        onClick={() => setModal({ open: true, update: false })}
                        className="fw-bold transform-btn "
                      >
                        اضافة توكنز
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, key) => (
                    <tr
                      key={key}
                      className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="col-md-3 prize ">
                            <div className="img-container">
                              <img
                                src={dollar.src}
                                className="ticket-img"
                                alt=""
                              />
                                               {/* <PiCoinsDuotone   className="text-yellow-500" style={{fontSize:'50px'}} /> */}

                            </div>
                            <h5 className="count">{item?.coins}</h5>
                            <h5 className="price text-white">{item?.price}$</h5>
                          </div>
                        </div>
                        <div className="delete-update-btn d-flex justify-content-between m-auto ">
                          <button
                            className="edit-btn fw-bold transform-btn "
                            onClick={() =>
                              setModal({
                                data: item,
                                open: true,
                                update: true,
                              })
                            }
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(item?._id)}
                            className="delete-btn fw-bold transform-btn "
                          >
                            حذف
                          </button>
                        </div>{" "}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  "></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CoinStoreModel
        open={modal.open}
        data={modal.data}
        update={modal.update}
        handleClose={handleClose}
      />
    </div>
  );
};

export default coinStore;
