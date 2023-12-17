"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';
import levels from './slices/levels';
import playingCoins from './slices/playingCoins';

const store = configureStore({
  reducer: {
    levels,
    user,
    playingCoins

  },
});

export default store;
