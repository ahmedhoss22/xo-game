import { createSlice } from "@reduxjs/toolkit";

const soundSlice =createSlice({
    name:'sound',
    initialState: { sound:true},

    reducers:{
        playSound:(state)=>{
            state.sound=true;
        },
        stopSound:(state)=>{
            state.sound=false;
        },
    },

})

export const {playSound, stopSound} = soundSlice.actions;
export default soundSlice.reducer;