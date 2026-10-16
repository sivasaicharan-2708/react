import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from './../redux/cakesSlice';
import iceCreamSlice from "./iceCreamSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamSlice,
    user: userSlice
  }
})

export default store;
