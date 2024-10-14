import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addComment,
  viewComments,
  updateComment,
  deleteComment,
} from "../api/comment";

export const add = createAsyncThunk("comment/add", async (data, thunkAPI) => {
  await addComment(data);
  thunkAPI.dispatch(comments(data.videoCode));
});

export const update = createAsyncThunk(
  "comment/update",
  async (data, thunkAPI) => {
    console.log(data);
    await updateComment(data);
    thunkAPI.dispatch(comments(data.videoCode));
  }
);

export const deleteCom = createAsyncThunk(
  "comment/delete",
  async (data, thunkAPI) => {
    await deleteComment(data.commentCode);
    thunkAPI.dispatch(comments(data.videoCode));
  }
);

export const comments = createAsyncThunk(
  "comment/comments",
  async (videoCode) => {
    const response = await viewComments(videoCode);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(comments.fulfilled, (state, action) => {
      state.commentList = action.payload;
    });
  },
});

export default commentSlice;
