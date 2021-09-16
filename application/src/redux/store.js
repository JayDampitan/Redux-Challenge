// import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authReducer";
import reducers from "./reducers";
import allReducers from "./reducers";

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const store = configureStore({
  reducer: { 
      auth: authSlice, 
    },
});

export default store;
