import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from './../redux/cakesSlice';

const initialState = {
  numberOfIceCreams: 10
}

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {
    ordered: (prevState, action) => {
      prevState.numberOfIceCreams -= (action.payload || 1)
    },
    refill: (prevState, action) => {
      prevState.numberOfIceCreams += (action.payload || 1)
    }
  },
  extraReducers: builder => {
    builder.addCase(cakeOrdered, (state, action) => {
      if (action.payload === 5) {
        state.numberOfIceCreams -= 1
      }
   })
  }
})

export const { ordered, refill } = iceCreamSlice.actions;
export default iceCreamSlice.reducer
