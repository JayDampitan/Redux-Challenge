import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_IP } from "../../private";

const INITIAL_STATE = { email: "", token: "" };

const doLogIn = async (email, password) => {
  try {
    const fetchResponse = await fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    if (fetchResponse.success) {
      return {
        email: fetchResponse.email,
        token: fetchResponse.token,
      };
    } else {
      return { ...INITIAL_STATE };
    }
  } catch (error) {
    console.error(error);
    return { ...INITIAL_STATE };
  }
};

export const logIn = createAsyncThunk("auth/logInStatus", doLogIn);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    
    logout: (state, action) => {
      state = {...INITIAL_STATE}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

