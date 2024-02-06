import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import Api ,{ handleApiError }  from "@/config/api";


export const login = createAsyncThunk(
	'authSlice/login',
	async (data, { rejectWithValue }) => {
	  try {
		const res = await   Api.post("/auth/login", data)
		return res.data;
	  } catch (error) { 
		throw handleApiError(error);  
	  }
	}
  );
  export const authSlice =createSlice({
    name: 'authSlice',
    extraReducers: ()=>{
        builder.addCase(login.fulfilled , (state , action)=>{
            
        }) 
    }
  })

export default authSlice.reducer; 