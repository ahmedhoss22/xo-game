'use client'
import { fetchUserData } from "@/redux/slices/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function GuestRoot({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const online = useSelector((state) => state.user.online);

  // if (loading) {
  //   return <></>;
  // }
// console.log(!online ,!loading);
//   if (!online && !loading) {
//     redirect('/home');
//   }

  return (
    <>{children}</>
  )
}
