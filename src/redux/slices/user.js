import Api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/users/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsersData = createAsyncThunk(
  "user/fetchAllUsersData",
  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/users/all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    all:[],
    online: false,
  },
  reducers: {
    onlineUser: (state, action) => {
      state.online = true;
    },
    offlineUser: (state, action) => {
 
      state.data={}     
      state.online = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.online = true
      state.data = action.payload;
    });
    builder.addCase(fetchAllUsersData.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

export const {offlineUser,onlineUser} = userSlice.actions;
export default userSlice.reducer;