'use client'
import "./card.scss";
import Footer from "@/components/footer/Footer";
import Title from "@/components/title/Title";
import { FaArrowLeft } from "react-icons/fa"; 
import ticketImage from "@/assets/photos/Ticket.png";
import dollar from "@/assets/photos/dollar.png";
import visaImage from "@/assets/photos/visa-icon.png";
import paypalIcon from "@/assets/photos/paypal-icon.png";
import paypalWord from "@/assets/photos/paypal-word.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "@/redux/slices/coinStoreSlice";
import { useEffect } from "react";
import { GiCoins } from "react-icons/gi";
import { PiCoinsDuotone } from "react-icons/pi";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Api from "@/config/api";

const card = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.coinStoreSlice.items);

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const createOrder = (data) => {
    return Api.post("/my-server/create-paypal-order", {
      cart: [
        {
          sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
          quantity: "1",
        },
      ],
    })
    .then((response) => response.data.id);
  };
  
  const onApprove = (data) => {
    return Api.post("/my-server/capture-paypal-order", {
      orderID: data.orderID
    })
    .then((response) => response.data);
  };
 
  return (
    <div className=" card-page d-flex flex-column ">
    <div className="flex-grow">
      <div className="container ">
      <div className="d-flex justify-content-between-lg justify-content-around pb-4 pt-4">
        <div className="">
          <FaArrowLeft className="text-white pointer h-5 mt-10" />
        </div>
        <div>
          <Title />
        </div>
      </div>


        {/* <div className=""> */}
          {/* <div className="  g-5 justify-content-center  align-items-center"> */}
       
            <div className="row w-25 m-auto  d-flex justify-content-around align-items-center ">

       
          {items.map((item, key) => (  
             <div key={key} className="col-md-6 col-lg-4">
            <Link href='/payment'  className=" link ticket">
               <div className="img-container">          
                 {/* <PiCoinsDuotone   className="text-yellow-500" style={{fontSize:'50px'}} /> */}

                <img src={dollar.src} className="ticket-img" alt="" />
              </div> 
              <h5 className="count">{item?.coins}</h5>
              <h5 className="price text-white">{item?.price}$</h5>
            </Link>
              </div>      ))}     
       
          </div>
          <div className="col-md-6 col-lg-4 m-auto "style={{  borderTop: '1px white solid'}}> 
          </div>
          <div className="row d-flex justify-content-around  w-25 m-auto">
            {/* <div className="col-lg-4 d-flex justify-content-center payment-method d-flex gap-2 gy-3">
              <Link href="/payment" className="visa">
                <img src={visaImage.src} alt="" />
              </Link>
            </div> */}
            <div className="col-lg-4  d-flex justify-content-center payment-method d-flex gap-2 gy-3 mb-4">
              {/* <Link href={"/payment"} className="paypal d-flex">
                <img src={paypalIcon.src} className="paypal-icon" alt="" />
                <img src={paypalWord.src} className="paypal-word" alt="" />
              </Link> */}
                <PayPalButtons />

            </div>
          </div>

          {/* </div> */}
        </div>
      
      </div>
         <Footer />
     </div>
  );
};

export default card;
