import Api from '@/config/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUserData= createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/users/user')
      console.log(response.data);
      return response.data;
    } catch (error) {
       return thunkAPI.rejectWithValue(error.message);
    }
}
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
      data:{},
      online:false
   },
  reducers: {
      onlineUser :(state,action)=>{
        state.online = true        
      },
      offlineUser : (state,action)=>{
        state.online = false
      }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload

    });
  }
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
