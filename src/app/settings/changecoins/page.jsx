"use client";
import "./changeCoins.scss";
import tickets from "../../../assets/photos/Ticket.png";
import StoreModal from "@/components/storeModal/StoreModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "@/redux/slices/storeSlice";

const changeCoins = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.storeSlice.items);
  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER;
// console.log(items);
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
                      أستبدال منتج{" "}
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      شراء التوكنز{" "}
                    </th> */}

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
                      <td className="px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="col-md-3 prize ">
                            <div className="img-container">
                              <img
                              src={apiUrl + item.image} 
                                className="img"
                                alt=""
                              />
                            </div>
                            <h5 className="count">{item.name}</h5>
                            <div className="price text-white d-flex align-items-center justify-content-center gap-2">
                            {item.cost} <img                                 src={tickets.src}
 alt="item-image" />
                            </div>
                          </div>
                        </div>
                        <div className="delete-update-btn d-flex justify-content-between m-auto ">
                          <button
                            className="edit-btn fw-bold transform-btn "
                            onClick={()=>setModal({
                              data: item,
                              open: true,
                              update: true,
                            })}
                          >
                            تعديل
                          </button>
                          <button className="delete-btn fw-bold transform-btn " onClick={()=>handleDelete(item._id)}>
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
