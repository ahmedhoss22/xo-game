'use client'
import "./card.scss";
import Footer from "@/components/footer/Footer";
import Title from "@/components/title/Title";
import { FaArrowLeft } from "react-icons/fa";
import dollar from "@/assets/photos/dollar.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "@/redux/slices/coinStoreSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Api from "@/config/api";
import ticketImage from "@/assets/photos/Ticket.png";
import visaImage from "@/assets/photos/visa-icon.png";
import paypalIcon from "@/assets/photos/paypal-icon.png";
import paypalWord from "@/assets/photos/paypal-word.png";
import Link from "next/link";
import { PiCoinsDuotone } from "react-icons/pi";
import { GiCoins } from "react-icons/gi";

const card = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter(); 
  const dispatch = useDispatch();
  const items = useSelector((state) => state.coinStoreSlice.items);

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

 

  return (
    <div className=" card-page d-flex flex-column ">
      <div className="flex-grow">
        <div className="container ">
          <div className="d-flex justify-content-between-lg justify-content-around pb-4 pt-4">
            <div className="">
              <FaArrowLeft  onClick={()=>router.push('/')}  className="text-white pointer h-5 mt-10" />
            </div>
            <div>
              <Title />
            </div>
          </div>

          {/* <div className=""> */}
          {/* <div className="  g-5 justify-content-center  align-items-center"> */}
          <div className="row w-25 m-auto  d-flex justify-content-around align-items-center ">
            {items.map((item, key) => (
              <div key={key} class="col-lg-6 col-xl-4">
                <div  className=" link ticket">
                  <div className="img-container">

                    <img src={dollar.src} className="ticket-img" alt="" />
                  </div>
                  <div className="text-center">
                                      <h5 className="count">{item?.coins}</h5>
                  <h5 className="price text-white">{item?.price}$</h5>  
                  </div>
                  <div>
                       <button
          onClick={()=>router.push(`/card/${item?._id}`)}
                    type="submit"
                    className="transform-btn mt-1 d-flex align-items-center justify-content-center card-btn text-white border-radius-20  pointer"
                  >
                   {t("card.buy")}
                  </button> 
                  </div>
    
                </div>
  
              </div>))}

          </div>
          {/* <div className="col-8 col-md-6 col-lg-4 col-xl-2 m-auto " style={{ borderTop: '1px white solid' }}>
          </div> */}
          {/* <div className="col-8  col-md-6  col-lg-4 col-xl-2 mt-4 m-auto">          <button
          onClick={()=>router.push('/payment')}
                    type="submit"
                    className="transform-btn mt-2 mb-1 d-flex align-items-center justify-content-center card-btn text-white border-radius-20  pointer"
                  >
                    {t("card.buy")}
                  </button></div> */}

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
