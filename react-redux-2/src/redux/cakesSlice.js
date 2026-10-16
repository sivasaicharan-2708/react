import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfCakes: 10
}

// This created Action Types and action generators
// Action Types cake/ordered, cake/refill
//
// Action Creators: cakeSlice.actions
// ordered() = {type: cake/ordered, payload: <number>}
// refill() => {type: cake/refill, payload: <number>}
//
// reducer = cakeSlice.reducer
const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (prevState, action) => {
      prevState.numberOfCakes -= (action.payload || 1)
    },
    refill: (prevState, action) => {
      prevState.numberOfCakes += (action.payload || 1);
    }
  }
})

export const {ordered, refill} = cakeSlice.actions;
export default cakeSlice.reducer;
