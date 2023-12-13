import Api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetcLevels = createAsyncThunk(
  "user/fetcLevels",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/level");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const levelsSlice = createSlice({
  name: "levels",
  initialState: {
    data: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetcLevels.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {} = levelsSlice.actions;
export default levelsSlice.reducer;
