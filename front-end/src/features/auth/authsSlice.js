import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const user = localStorage.getItem("token");
const initialState = {
  status: "idle",
  user: user ? user : null,
};

export const reLoginUser = createAsyncThunk("auth/relogin", async () => {
  return await fetch("http://localhost:4000/auto_login", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.ok) {
      return res.json().then((user) => {
        return { status: true, user };
      });
    } else {
      return res.json().then((errors) => {
        return { status: fail };
      });
    }
  });
});

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  return await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      return res.json().then((user) => {
        localStorage.setItem("token", user.token);
        return user;
      });
    } else {
      return res.json().then((errors) => {
        return false;
      });
    }
  });
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    return await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((user) => {
          localStorage.setItem("token", user.token);
          return user;
        });
      } else {
        return res.json().then((errors) => {
          useDispatch(addMessage(errors));
          return null;
        });
      }
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState, // Parse the inital states
  reducers: {
    logoutUser: {
      reducer(state, action) {
        state.user = null;
      },
      prepare() {
        localStorage.removeItem("token");
        return { payload: null };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(reLoginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(reLoginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
