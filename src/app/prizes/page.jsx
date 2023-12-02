import "./prizes.scss";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";
import { FaArrowLeft } from "react-icons/fa";
import moneyImage from "../../assets/money-bag.png";
import xoImage from "../../assets/xo.png";
import ticketImage from "../../assets/Ticket.png";
import visaImage from "../../assets/visa-icon.png";
import paypalIcon from "../../assets/paypal-icon.png";
import paypalWord from "../../assets/paypal-word.png";

const prizes = () => {
  return (
    <div className=" prizes">
      <div className="container ">
        <div className="row d-flex justify-content-between pt-4">
          <div className="">
            <FaArrowLeft className="text-white pointer h-5" />
          </div>
          <div className="">
            {/* <Title /> */}
          <h1 className="text-white">jjjjj</h1>  
          </div>
        </div>

        <div className="row">
          <div className="col-md-1">
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
          </div>
          {/* <div className="payment d-flex gap-2">
            <div className="visa">
                <img src={visaImage.src} alt="" />
            </div>
            <div className="paypal">
            <img src={paypalIcon.src} className="paypal-icon" alt="" />
            <img src={paypalWord.src} className='paypal-word'alt="" />

            </div>
        </div> */}

          <div className="col-md-1">
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
          </div>
          <div className="col-md-3">
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
          </div>

          <div className="col-md-1">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default prizes;
