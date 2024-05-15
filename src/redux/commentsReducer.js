import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComments } from 'services/api';

export const fetchCommentsThunk = createAsyncThunk(
  'comments/fetchCommentsThunk',
  async (postId, thunkApi) => {
    try {
      const comments = await fetchComments(postId);
      return comments;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  countValue: 1,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    incrementCounter: state => {
      state.countValue = state.countValue + 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchCommentsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const commentsReducer = commentsSlice.reducer;
