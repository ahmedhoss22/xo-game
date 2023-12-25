import Api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOtherUser = createAsyncThunk(
  "user/fetchOtherUser",
  async (id, thunkAPI) => {
    try {
      const response = await Api.get(`/users/user/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    data: {},
    otherPlayer: {},
  },
  reducers: {
    setRoomData: (state, action) => {
      state.data = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchOtherUser.fulfilled, (state, action) => {
      state.otherPlayer = action.payload;
    });
  },
});

export const {setRoomData} = roomSlice.actions;
export default roomSlice.reducer;
