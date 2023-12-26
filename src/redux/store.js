"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';
import levels from './slices/levels';
import playingCoins from './slices/playingCoins';
import loadingReducer from './slices/loadingSlice';
import storeSlice from './slices/storeSlice';
import room from './slices/room';

const store = configureStore({
  reducer: {
    levels,
    user,
    playingCoins,
    loading: loadingReducer,
    room,
    storeSlice,
  },
});

export default store;
