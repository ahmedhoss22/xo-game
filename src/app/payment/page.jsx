import "./payment.scss";
import Title from "../../components/title/title";
import Footer from "@/components/footer/Footer";
import { FaArrowLeft } from "react-icons/fa";
import moneyImage from "../../assets/money-bag.png";
import visaImage from "../../assets/visa-icon.png";
import  paypalIcon from "../../assets/paypal-icon.png";
import  paypalWord from "../../assets/paypal-word.png";

const payment = () => {
  return (
    <div className=" payment">
      <div className="container ">
        <div className="row d-flex justify-content-between pt-4">
          <div className="">
            <FaArrowLeft className="text-white pointer h-5" />
          </div>
          <div className="">
            {/* <Title /> */}
          </div>
        </div>
  

      <div className="row ">
        <div className="paypal col-lg-6">
            <div className="paypal-img-container">
            <img src={paypalIcon.src} className="paypal-icon" alt="" />
            <img src={paypalWord.src} className='paypal-word'alt="" />
            </div>
          
        </div>
        <div className="visa col-lg-6">
     
            <img src={visaImage.src} className="visa-img" alt="" />
            </div>
          
      
      </div>
       
      </div>
      <Footer />
    </div>
  );
};

export default payment;
