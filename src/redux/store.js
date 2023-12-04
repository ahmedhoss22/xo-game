"use client";
import user from '@/redux/slices/user';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user
},
});

export default store;
