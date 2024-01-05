"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';
import levels from './slices/levels';
import playingCoins from './slices/playingCoins';
import loadingReducer from './slices/loadingSlice';
import storeSlice from './slices/storeSlice';
import coinStoreSlice from './slices/coinStoreSlice';
import orderSlice from './slices/orderSlice';
import room from './slices/room';
import createRoomSlice from './slices/createRoomSlice';

const store = configureStore({
  reducer: {
    levels,
    user,
    playingCoins,
    loading: loadingReducer,
    room,
    storeSlice,
    orderSlice,
    coinStoreSlice,
    createRoomSlice
  },
});

export default store;
