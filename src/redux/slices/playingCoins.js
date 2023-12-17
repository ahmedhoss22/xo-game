import Api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlayingCoins = createAsyncThunk(
  "playingCoins/PlayingCoins",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/playing-coins/all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const PlayingCoinsSlice = createSlice({
  name: "playingCoins",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayingCoins.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {} = PlayingCoinsSlice.actions;
export default PlayingCoinsSlice.reducer;