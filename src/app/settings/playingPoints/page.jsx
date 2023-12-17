"use client";
import "./playingPoints.scss";
import bg1 from "../../../assets/photos/bg1.png";
import bg2 from "../../../assets/photos/bg2.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetcLevels } from "@/redux/slices/levels";
import PlayingCoinsModal from "@/components/PlayingCoinsModal/PlayingCoinsModal";
import {  fetchPlayingCoins } from "@/redux/slices/playingCoins";

const PlayingPoints = () => {
  const dispatch = useDispatch();
  const playingCoins = useSelector((state) => state.playingCoins.data);
  
  useEffect(() => {
    dispatch(fetchPlayingCoins());
  }, []);

  const [modal, setModal] = useState({
    open: false,
    update: false,
    data: null,
  });
  const handleClose = () =>
    setModal({ open: false, update: false, data: null });
  return (
    <>
      <div className="users-points rtl">
        <div className="container">
          <div className="header col-12 d-flex align-items-center justify-content-around  text-white fw-bold">
            <h5> نقاط الدخول</h5>
            <h5>نقاط الفوز </h5>
            <h5>عدد الجولات </h5>
            <button
              className="fw-bold transform-btn "
              onClick={() => setModal({ ...modal, open: true })}
            >
              اضافة مستوي
            </button>
          </div>
          <div className="row pt-4">
            {playingCoins.map((ele, ind) => (
              <div key={ind}>
                <div
                  key={ind}
                  className=" col-12 d-flex align-items-center justify-content-around  text-white "
                >
                  <p>{ele.coins}</p>
                  <p>{ele.winCoins}</p>
                  <p>{ele.rounds}</p>
                  <button
                    className="edit-btn fw-bold transform-btn "
                    onClick={() =>
                      setModal({ data: ele, open: true, update: true })
                    }
                  >
                    تعديل
                  </button>
                </div>
                <hr className="text-white  p-4 mt-1 " />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PlayingCoinsModal
        data={modal.data}
        handleClose={handleClose}
        open={modal.open}
        update={modal.update}
      />
    </>
  );
};

export default PlayingPoints;
