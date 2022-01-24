import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

export const addMessage = createAsyncThunk(
  "message/addMesage",
  async (message) => {
    return message;
  }
);

export const clearMessage = createAsyncThunk(
  "message/clearMessage",
  async (message) => {
    return message;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState, // Parse the inital states
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    });
    builder.addCase(clearMessage.fulfilled, (state, action) => {
      state.message = null;
    });
  },
});

export default messageSlice.reducer;
