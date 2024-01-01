"use client";
import "./payment.scss";
import Title from "@/components/title/Title";
import Footer from "@/components/footer/Footer";
import { FaArrowLeft } from "react-icons/fa";
import moneyImage from "../../../assets/photos/money-bag.png";
import visaImage from "../../../assets/photos/visa-icon.png";
import paypalIcon from "../../../assets/photos/paypal-icon.png";
import paypalWord from "../../../assets/photos/paypal-word.png";
import Link from "next/link";
import { Checkbox, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const payment = () => {
  function handlePaypal(values) {
    console.log(values);
  }

  let validationPaypalSchema = Yup.object({
    cardNumber: Yup.number().required("Please enter Card Number "),
    acceptTerms: Yup.string().required("Please Accept Terms and conditions "),
  });

  let formikPaypal = useFormik({
    initialValues: {
      cardNumber: "",
      acceptTerms: true,
    },
    validationPaypalSchema,
    onSubmit: handlePaypal,
  });

  function handleVisa(values) {
    console.log(values);
  }

  let validationVisaSchema = Yup.object({
    cardNumber: Yup.number().required("Please enter Card Number "),
    holderName: Yup.string().required("Please enter Holder Name "),
    expDate: Yup.date().required("Please enter Exp Date "),
    cvvNumber: Yup.number().required("Please enter CVV Number "),
    acceptTerms: Yup.string().required("Please Accept Terms and conditions "),
  });

  let formikVisa = useFormik({
    initialValues: {
      cardNumber: "",
      holderName: "",
      expDate: "",
      cvvNumber: "",
      acceptTerms: true,
    },
    validationVisaSchema,
    onSubmit: handleVisa,
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className=" payment d-flex flex-column ">
    <div className="flex-grow">
      <div className="container ">
        <div className="  d-flex justify-content-between pt-4">
          <div className="">
            <FaArrowLeft className="text-white pointer h-5 mt-10" />
          </div>
          <Link href="/message">
            <Title />
          </Link>
        </div>

        <div className="row  gy-4 mb-4">
          <form
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
          </form>

          <form onSubmit={formikVisa.handleSubmit} className="visa col-md-6">
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
            {/* <div className="d-flex justify-content-around "> */}
            
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
                // className=" mt-4 col-lg-5 col-md-4 col-3"
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
                // className=" mt-4 col-lg-5 col-md-4 col-3"
                className=" mt-4 col-md-6"
                // label="Exp date"
                variant="standard"
              />
            {/* </div> */}
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
          
          </form>
        </div>
      </div>
      </div>
         <Footer />
     </div>
  );
};

export default payment;
