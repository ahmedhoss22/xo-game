import "./prizes.scss";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";
import { FaArrowLeft } from "react-icons/fa";
import moneyImage from "../../assets/photos/money-bag.png";
import xoImage from "../../assets/photos/xo.png";
import ticketImage from "../../assets/photos/Ticket.png";
import visaImage from "../../assets/photos/visa-icon.png";
import paypalIcon from "../../assets/photos/paypal-icon.png";
import paypalWord from "../../assets/photos/paypal-word.png";
import Link from "next/link";

const prizes = () => {
  return (
    <div className=" prizes">
      <div className="container ">
        <div className=" d-flex justify-content-between pt-4">
          <div className="">
            <FaArrowLeft className="text-white pointer h-5 mt-10" />
          </div>
          <div>
            <Title />
            {/* <h1 className="text-white">jjjjj</h1>   */}
          </div>
        </div>

        <div className="">
          {/* <div className="  g-5 justify-content-center  align-items-center"> */}
          <div className="row d-flex justify-content-around  w-25 m-auto">
            <div className="col-md-3 prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="col-md-3 prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div>
          <div className="row d-flex justify-content-around  w-25 m-auto">
            <div className="col-3 prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="col-md-3 prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div>
          <div className="text-white  p-2 fs-1 fw-bold  w-25 m-auto">
            <hr />
          </div>
          <div className="row d-flex justify-content-around  w-25 m-auto">
            <div className="col-lg-4 d-flex justify-content-center payment-method d-flex gap-2 gy-3">
              <Link href="/payment" className="visa">
                <img src={visaImage.src} alt="" />
              </Link>
            </div>
            <div className="col-lg-4  d-flex justify-content-center payment-method d-flex gap-2 gy-3">
              <Link href={"/payment"} className="paypal d-flex">
                <img src={paypalIcon.src} className="paypal-icon" alt="" />
                <img src={paypalWord.src} className="paypal-word" alt="" />
              </Link>
            </div>
          </div>

          {/* </div> */}
        </div>
        {/* <div className="col-md-3">
            <div className="prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="prize">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div> */}

        {/* <div className="col-md-1">
            <div className="prize">
              <div className="img-container">
                <img src={moneyImage.src} className="money-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="prize">
              <div className="img-container">
                <img src={moneyImage.src} className="money-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="prize">
              <div className="img-container">
                <img src={moneyImage.src} className="money-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="prize">
              <div className="img-container">
                <img src={moneyImage.src} className="money-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div> */}
        {/* <div className="payment d-flex gap-2">
            <div className="visa">
                <img src={visaImage.src} alt="" />
            </div>
            <div className="paypal">
            <img src={paypalIcon.src} className="paypal-icon" alt="" />
            <img src={paypalWord.src} className='paypal-word'alt="" />

            </div>
        </div> */}
        {/* <div className="col-md-1">
            <div className="prize">
              <div className="img-container">
                <img src={xoImage.src} className="xo-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="prize">
              <div className="img-container">
                <img src={xoImage.src} className="xo-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="prize">
              <div className="img-container">
                <img src={xoImage.src} className="xo-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="prize">
              <div className="img-container">
                <img src={xoImage.src} className="xo-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div> */}
      </div>
      <div className="  rtl fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default prizes;
