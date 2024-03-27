
import * as Yup from "yup";

export const  loginValidationSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required"),
  });

export const registerValidationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength 3")
      .max(20, "name maxlength"),
      phone: Yup.string()
      .required("phone is required")
      .matches(/^[0-9]{10}$/, 'Phone number is not valid'),

    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("Password is required"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password dosnot  match"),
  });
