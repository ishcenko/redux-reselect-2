import { createSlice } from '@reduxjs/toolkit';
import { fetchPostDataThunk } from './postDetailsOperations';

const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
  countValue: 1,
};

const postDetailsSlice = createSlice({
  name: 'postDetails',
  initialState,
  reducers: {
    incrementCounter: state => {
      state.countValue = state.countValue + 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPostDataThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetails = action.payload;
      })
      .addCase(fetchPostDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { incrementCounter } = postDetailsSlice.actions;
export const postDetailsReducer = postDetailsSlice.reducer;
