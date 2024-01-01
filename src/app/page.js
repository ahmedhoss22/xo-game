"use client";
import Loading from "@/components/loading/Loading";
import Homepage from "./(private_route)/home/page";
import Login from "./(guest_route)/login/page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "@/redux/slices/loadingSlice";
import WinModel from "@/components/winModel/WinModel";
import { fetchUserData } from "@/redux/slices/user";

const MainPage = () => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const online = useSelector((state) => state.user.online);

  useEffect(() => {
    dispatch(fetchUserData())
      .unwrap()
      .then(() => stopLoading())
      .catch((error) => {
        console.error("Error fetching user data:", error);
        stopLoading();
      });
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(stopLoading());
    }, 1000);
  }, []);

  return (
    <div>
      <div>
        {/* <WinModel/> */}
        {isLoading ? (
          <Loading text="XO Game is Loading ..." />
        ) : online ? (
          <Homepage />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default MainPage;
