"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';
import levels from './slices/levels';
const store = configureStore({
  reducer: {
    levels,
    user,

  },
});

export default store;
