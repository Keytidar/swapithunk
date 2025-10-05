import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swapi from "../components/Swapi";

export const fetchJson = createAsyncThunk(
  'api/fetchJson',
  async (apiUrl) => {
    const res = await fetch(apiUrl);
    return res.json();
  }
)

const initialState = {
  data: '',
  status: 'idle',
  error: null,
}

const ApiSlice = createSlice({
  name: 'apireceived',
  initialState: initialState,
  reducers: {clearData: () => initialState},
  extraReducers: (b) => {
    b.addCase(fetchJson.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    b.addCase(fetchJson.pending, (state, action) => {
      state.status = 'pending';
    });
    b.addCase(fetchJson.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
  }
})

export const { clearData } = ApiSlice.actions;

export default ApiSlice.reducer;