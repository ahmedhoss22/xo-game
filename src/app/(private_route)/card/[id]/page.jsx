"use client";
import "./payment.scss";
import "../card.scss";
import Title from "@/components/title/Title";
import Footer from "@/components/footer/Footer";
import dollar from "@/assets/photos/dollar.png";
import Link from "next/link";
import Api from "@/config/api";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllItems } from "@/redux/slices/coinStoreSlice";
import moneyImage from "@/assets/photos/money-bag.png";
import visaImage from "@/assets/photos/visa-icon.png";
import paypalIcon from "@/assets/photos/paypal-icon.png";
import paypalWord from "@/assets/photos/paypal-word.png";
import { Checkbox, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; 
const payment = ({ params }) => {
  const router = useRouter()
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
 
  
  
  async function getItem() {
    try {
      let res = await Api.get("/coin-store/all");
      let data = res.data;
      let item = data?.find((ele) => ele._id == params.id);
      setItem(item);
      console.log(item);
      // setitems(res.data);
    } catch (e) {
      let error = e?.response?.data?.message || e?.response?.data?.error;
      console.log(`error ${error}`);
    }
  }
  useEffect(() => {
    dispatch(getAllItems());
    getItem();
  }, []);

  const createOrder = (price, actions) => {
    return Api.post("/paypal/create-paypal-order", {
        currency: "USD",
        price,

    })
      .then((response) => {
      return  response.data.id
      });
  };

  const onApprove = (data, price, coins, actions) => {
    return Api.post("/paypal/capture-paypal-order", {
      orderID: data.orderID,
      price,
      coins 
    })
  .then((response) =>router.push("/home") )
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };



  // function handlePaypal(values) {
  //   console.log(values);
  // }
  // const router =useRouter()

  // let validationPaypalSchema = Yup.object({
  //   cardNumber: Yup.number().required("Please enter Card Number "),
  //   acceptTerms: Yup.string().required("Please Accept Terms and conditions "),
  // });

  // let formikPaypal = useFormik({
  //   initialValues: {
  //     cardNumber: "",
  //     acceptTerms: true,
  //   },
  //   validationPaypalSchema,
  //   onSubmit: handlePaypal,
  // });

  // function handleVisa(values) {
  //   console.log(values);
  // }

  // let validationVisaSchema = Yup.object({
  //   cardNumber: Yup.number().required("Please enter Card Number "),
  //   holderName: Yup.string().required("Please enter Holder Name "),
  //   expDate: Yup.date().required("Please enter Exp Date "),
  //   cvvNumber: Yup.number().required("Please enter CVV Number "),
  //   acceptTerms: Yup.string().required("Please Accept Terms and conditions "),
  // });

  // let formikVisa = useFormik({
  //   initialValues: {
  //     cardNumber: "",
  //     holderName: "",
  //     expDate: "",
  //     cvvNumber: "",
  //     acceptTerms: true,
  //   },
  //   validationVisaSchema,
  //   onSubmit: handleVisa,
  // });

  return (
    <div className=" payment d-flex flex-column ">
    <div className="flex-grow">
      <div className="container ">
        <div className="  d-flex justify-content-between-lg justify-content-around  pt-4">
          <div className="">
            <FaArrowLeft onClick={()=>router.push('/card')} className="text-white pointer h-5 mt-10" />
          </div>
          <Link href="/message">
            <Title />
          </Link>
        </div>
        {/* <div className="row justify-content-center align-items-center"> */}
  <div className="col-12 w-100 m-auto justify-center align-center flex mt-4" >
    <div className="ticket d-flex flex-column justify-content-center align-items-center">
      <div className="img-container">
        <img src={dollar.src} className="ticket-img" alt="" />
      </div>
      <h5 className="count">{item?.coins}</h5>
      <h5 className="price text-white">{item?.price}$</h5>
    </div>
  </div>
{/* </div> */}

                   <div className="col-8 col-md-6 col-lg-4 col-xl-2 m-auto " style={{ borderTop: '1px white solid' }}>
          </div>

        <div className="row  flex flex-col align-items-center justify-center">
          <div className="mt-4 flex flex-col align-items-center justify-center" style={{height:'20vh'}}>   <PayPalButtons
             createOrder={(data, actions) => createOrder(item?.price , actions)} 
             onApprove={(data, actions) => onApprove(data, item.price, item.coins, actions)} 
             /> </div>
            
          
          {/* <form
            onSubmit={formikPaypal.handleSubmit}
            className="paypal col-md-6 gy-4 mb-4"
          >
            <div className="paypal-img-container">
              <img src={paypalIcon.src} className="paypal-icon" alt="" />
              <img src={paypalWord.src} className="paypal-word" alt="" />
            </div>
            {formikPaypal.touched.cardNumber &&
            formikPaypal.errors.cardNumber ? (
              <h4>{formikPaypal.errors.cardNumber}</h4>
            ) : null}
            <TextField
              type="number"
              name="cardNumber"
              id="cardNumber"
              value={formikPaypal.values.cardNumber}
              onChange={formikPaypal.handleChange}
              onBlur={formikPaypal.handleBlur}
              className=" mt-10 col-md-6"
              label="Card Number"
              variant="standard"
            />
            <div className="text-white mt-20 col-md-6">
              {formikPaypal.touched.acceptTerms &&
              formikPaypal.errors.acceptTerms ? (
                <h4>{formikPaypal.errors.acceptTerms}</h4>
              ) : null}
              <Checkbox
                {...label}
                name="acceptTerms"
                id="acceptTerms"
                value={formikPaypal.values.acceptTerms}
                onChange={formikPaypal.handleChange}
                onBlur={formikPaypal.handleBlur}
                defaultChecked
              />{" "}
              Accept terms & Conditions
            </div>
            <button
              type="submit"
              className="btn green-bg fw-bold text-white mt-10 transform-btn "
            >
              Done
            </button>
          </form> */}

          {/* <form onSubmit={formikVisa.handleSubmit} className="visa col-md-6">
            <div>
              <img src={visaImage.src} className="visa-img" alt="" />
            </div>
            {formikPaypal.touched.cardNumber &&
            formikPaypal.errors.cardNumber ? (
              <h4>{formikPaypal.errors.cardNumber}</h4>
            ) : null}
            <TextField
              type="number"
              name="cardNumber"
              id="cardNumber"
              value={formikVisa.values.cardNumber}
              onChange={formikVisa.handleChange}
              onBlur={formikVisa.handleBlur}
              className=" mt-4 col-md-6 "
              label="Card Number"
              variant="standard"
            />
            {formikPaypal.touched.holderName &&
            formikPaypal.errors.holderName ? (
              <h4>{formikPaypal.errors.holderName}</h4>
            ) : null}
            <TextField
              type="text"
              name="holderName"
              id="holderName"
              value={formikVisa.values.holderName}
              onChange={formikVisa.handleChange}
              onBlur={formikVisa.handleBlur}
              className=" mt-4 col-md-6"
              label="Holder Name"
              variant="standard"
            />
             
              {formikPaypal.touched.cvvNumber &&
              formikPaypal.errors.cvvNumber ? (
                <h4>{formikPaypal.errors.cvvNumber}</h4>
              ) : null}
              <TextField
                type="number"
                name="cvvNumber"
                id="cvvNumber"
                value={formikVisa.values.cvvNumber}
                onChange={formikVisa.handleChange}
                onBlur={formikVisa.handleBlur}
                 className=" mt-4 col-md-6"
                label="CVV Number"
                variant="standard"
              />
                {formikPaypal.touched.expDate && formikPaypal.errors.expDate ? (
                <h4>{formikPaypal.errors.expDate}</h4>
              ) : null}
              <TextField
                type="date"
                helperText='please enter Exp date'
                name="expDate"
                id="expDate"
                value={formikVisa.values.expDate}
                onChange={formikVisa.handleChange}
                onBlur={formikVisa.handleBlur}
                 className=" mt-4 col-md-6"
                 variant="standard"
              />
             <div className="text-white mt-5">
              {formikPaypal.touched.acceptTerms &&
              formikPaypal.errors.acceptTerms ? (
                <h4>{formikPaypal.errors.acceptTerms}</h4>
              ) : null}
              <Checkbox
                {...label}
                name="acceptTerms"
                id="acceptTerms"
                value={formikVisa.values.acceptTerms}
                onChange={formikVisa.handleChange}
                onBlur={formikVisa.handleBlur}
                defaultChecked
              />{" "}
              Accept terms & Conditions
            </div>
            <button
              type="submit"
              className="btn green-bg fw-bold text-white mt-4 transform-btn "
            >
              Done
            </button>
          
          </form> */}
        </div>
      </div>
      </div>
         <Footer />
     </div>
  );
};

export default payment;
