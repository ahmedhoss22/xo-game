import "./card.scss";
<<<<<<< HEAD:src/app/card/page.jsx
import Title from "@/components/title/Title";
=======
>>>>>>> 32e8828726a1fc57bcdc94320fddcede7719d1be:src/app/(private_route)/card/page.jsx
import Footer from "@/components/footer/Footer";
import Title from "@/components/title/Title";
import { FaArrowLeft } from "react-icons/fa"; 
import ticketImage from "../../../assets/photos/Ticket.png";
import visaImage from "../../../assets/photos/visa-icon.png";
import paypalIcon from "../../../assets/photos/paypal-icon.png";
import paypalWord from "../../../assets/photos/paypal-word.png";
import Link from "next/link";

const card = () => {
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


        <div className="">
          {/* <div className="  g-5 justify-content-center  align-items-center"> */}
          <div className="row d-flex justify-content-around  w-25 m-auto">
            <div className="col-md-3 ticket">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="col-md-3 ticket">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
          </div>
          <div className="row d-flex justify-content-around  w-25 m-auto">
            <div className="col-3 ticket">
              <div className="img-container">
                <img src={ticketImage.src} className="ticket-img" alt="" />
              </div>
              <h5 className="count">20000</h5>
              <h5 className="price text-white">40$</h5>
            </div>
            <div className="col-md-3 ticket">
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
            <div className="col-lg-4  d-flex justify-content-center payment-method d-flex gap-2 gy-3 mb-4">
              <Link href={"/payment"} className="paypal d-flex">
                <img src={paypalIcon.src} className="paypal-icon" alt="" />
                <img src={paypalWord.src} className="paypal-word" alt="" />
              </Link>
            </div>
          </div>

          </div>
        </div>
      
      </div>
         <Footer />
     </div>
  );
};

export default card;
