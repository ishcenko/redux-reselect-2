import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from 'services/api';

export const fetchPostDataThunk = createAsyncThunk(
  'postDetails/fetchPostDataThunk',
  async (postId, thunkApi) => {
    try {
      const postData = await fetchPosts(postId);
      return postData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
