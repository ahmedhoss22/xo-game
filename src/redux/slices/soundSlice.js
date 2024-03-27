// soundSlice.js
import { createSlice } from "@reduxjs/toolkit";

 

const soundSlice = createSlice({
  name: "sound",
  initialState: {
    isSoundOn: false,
  },
  reducers: {
    toggleSound(state) {
      state.isSoundOn = !state.isSoundOn;
      console.log( state.isSoundOn );
 
    },
  },
});

export const { toggleSound } = soundSlice.actions;
export default soundSlice.reducer;
