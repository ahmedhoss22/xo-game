"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';
import levels from './slices/levels';
import playingCoins from './slices/playingCoins';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    levels,
    user,
    playingCoins,
    loading: loadingReducer,
    

  },
});

export default store;
