'use client'
import { fetchUserData } from "@/redux/slices/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { selectLoading, stopLoading } from "@/redux/slices/loadingSlice";
import Loading from "@/components/loading/Loading";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import '../../config/translation'

export default function PrivateRoot({ children }) {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectLoading);
//   const online = useSelector((state) => state.user.online);
//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchUserData())
//       .unwrap()
//       .then(() => dispatch(stopLoading()))
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//         dispatch(stopLoading());
//       });
//   }, [dispatch]);

//   if (isLoading) {
//     return <Loading text="Loading..." />;
//   }


//   if (!online) {
//     redirect('/login');
//     return null;
//   }
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    currency: "USD",
    intent: "capture",
};
  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        {children}
      </PayPalScriptProvider>
    </>
  );
}
