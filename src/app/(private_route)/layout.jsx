'use client'
import { fetchUserData } from "@/redux/slices/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function PrivateRoot({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const online = useSelector((state) => state.user.online);

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <></>;
  }

  if (!online && !loading) {
    redirect('/login');
  }

  return (
    <>{children}
    </>
  )
}
