"use client";
import Loading from "@/components/loading/Loading"; 
import CoinsOfGame from "./(private_route)/coinsofgame/page"; 
import Login from "./(guest_route)/login/page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {selectLoading, stopLoading} from "@/redux/slices/loadingSlice"; 
import { fetchUserData } from "@/redux/slices/user";
import '../config/translation'

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
        {isLoading ? (
          <Loading text="XO Game is Loading ..." />
        ) : online ? (
          <CoinsOfGame />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default MainPage;