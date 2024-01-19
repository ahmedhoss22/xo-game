"use client";
import "./changeCoins.scss";
import tickets from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import StoreModal from "@/components/storeModal/StoreModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "@/redux/slices/storeSlice";
import { Button, Card } from "react-bootstrap";

const changeCoins = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.storeSlice.items);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;

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
    <div className="change-coins rtl">
      <div className="container">
        <div className="row mb-4">
          <div className=" gy-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="  text-gray-700 uppercase header text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      أسم المنتج{" "}
                    </th>
                          <th scope="col" className="px-6 py-3">
                      صورة المنتج{" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      عدد التوكنز{" "}
                    </th>

              
                    <th scope="col" className="px-6 py-3">التعديل و الحذف</th>

                    <th scope="col" className="px-6 py-3">
                      <button
                        className="fw-bold transform-btn "
                        onClick={() => setModal({ open: true, update: false })}
                      >
                        أنشاء منتج
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
                      <td className="text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {item?.name}
                      </td>
                      <td className=" px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center ">
                          <img
                            variant="top"
                            src={apiUrl + item?.image}
                            style={{
                              height: "90px",
                              width: "90px",
                              borderRadius: "50px",
                              border:'solid 2px white'
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {item?.cost} <img src={dollar.src} style={{
                            width:'28px',
                            height:'28px'
                          }} alt="" />
                        </div>
                      </td>
                      <td className="text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex ">
                          <Button
                            onClick={() =>
                              setModal({
                                data: item,
                                open: true,
                                update: true,
                              })
                            }
                            className="update-btn w-100 transform-btn m-1 "
                          >
                            تعديل{" "}
                          </Button>
                          <Button
                            onClick={() => handleDelete(item?._id)}
                            className="m-1 delete-btn w-100 transform-btn "
                          >
                            حذف{" "}
                          </Button>
                        </div>
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
      <StoreModal
        open={modal.open}
        data={modal.data}
        update={modal.update}
        handleClose={handleClose}
      />
    </div>
  );
};

export default changeCoins;
