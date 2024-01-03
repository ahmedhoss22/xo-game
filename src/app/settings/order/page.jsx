"use client";
import "./order.scss";
import ticket from "@/assets/photos/Ticket.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getAllItems } from "@/redux/slices/orderSlice";
import { Button, Card } from "react-bootstrap";

const order = () => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.orderSlice.items);
  console.log(items[0]?.user?.name);
  console.log(items);
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
    <div className="order-page rtl">
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
                      اسم المنتج
                    </th>{" "}
                    <th scope="col" className="px-6 py-3">
                      صورة المنتج
                    </th>
                    <th scope="col" className="px-6 py-3">
                      عدد التوكنز{" "}
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, key) => (
                    <tr
                      key={key}
                      className=" text-center border-b dark:bg-gray-800 dark:border-gray-700   dark:hover:bg-gray-600 pointer"
                    >
                      <td className=" text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {item?.user?.name}{" "}
                      </td>
                      <td className=" text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        {item?.store?.name}{" "}
                      </td>

                      <td className=" px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center ">
                          <img
                            variant="top"
                            src={apiUrl + item?.store?.image}
                            style={{
                              height: "90px",
                              width: "90px",
                              borderRadius: "50px",
                              border: "solid 2px white",
                            }}
                          />
                        </div>
                      </td>
                      <td className=" text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {item?.store?.cost} <img src={ticket.src} alt="" />
                        </div>
                      </td>

                      <td className="text-center px-6 py-4 font-semibold text-gray-900 text-white dark:text-white  ">
                        <div className="d-flex ">
                          <Button className="update-btn w-100 transform-btn m-1 ">
                            قبول{" "}
                          </Button>
                          <Button
                            onClick={() => handleDelete(item?._id)}
                            className="m-1 delete-btn w-100 transform-btn "
                          >
                            رفض{" "}
                          </Button>
                        </div>
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
  );
};

export default order;
