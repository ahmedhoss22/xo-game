import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import Api ,{ handleApiError }  from "@/config/api";
import { toast } from 'react-toastify';

export const getAllItems = createAsyncThunk(
	'coinStoreSlice/getAllItems',
	async (_, { rejectWithValue }) => {
	  try {
		const res = await Api.get('/coin-store/all');  
		return res.data;
	  } catch (error) { 
		throw handleApiError(error);  
	  }
	}
  );
   
export const createItem = createAsyncThunk(
	'coinStoreSlice/createItem',
	async (data, { rejectWithValue }) => {
		try {
			const res = await Api.post('/coin-store', data);
			return res.data;
		} catch (error) { 
			throw handleApiError(error);
		}
	}
);

export const updateItem = createAsyncThunk(
	'coinStoreSlice/updateItem',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await Api.patch(`/coin-store/update/${id}`, data);
			return res.data;
		} catch (error) { 

			handleApiError(error);
		}
	}
);
 

export const deleteItem = createAsyncThunk(
	'coinStoreSlice/deleteItem',
	async (id, { rejectWithValue }) => {
		try {
			const res = await Api.delete(`/coin-store/${id}`);
			return res.data;
		} catch (error) { 

			handleApiError(error);
		}
	}
);

export const coinStoreSlice = createSlice({
	name: 'coinStoreSlice',
	initialState: {
		items: [], 
		item: null,
		loading: false,
		error: null,
		message: null,
		success: false,
	},
	extraReducers: (builder) => { 
		builder.addCase(getAllItems.fulfilled, (state, action) => {
			state.loading = false;
			state.items = action?.payload; 
			console.log(action.payload);
		}); 

		builder.addCase(createItem.fulfilled, (state, action) => {
			state.loading = false;
			state.item = action?.payload?.data;
			toast.success(action.payload?.message);
		}); 
		builder.addCase(updateItem.fulfilled, (state, action) => {
			state.loading = false;
			state.item = action?.payload?.data;
			toast.success(action.payload?.message);
		});  

		builder.addCase(deleteItem.fulfilled, (state, action) => {
			state.loading = false;
			state.item = action?.payload?.data;
			toast.success(action.payload?.message);
		}); 

		builder
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.loading = true;
					state.success = false;
					state.error = '';
					state.message = '';
				}
			) 
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action) => {
					state.loading = false;
					state.message = '';
					state.error = action.payload;
					state.course = {};
					state.success = false;
				}
			);
	},
});

export default coinStoreSlice.reducer; 