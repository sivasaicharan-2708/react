import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numberOfCakes: 10
}

// Actions
// cake/ordered
// cakeSlice.actions
// cakeSlice.reducer
const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numberOfCakes -= action.payload
    }
  }
});

export default cakeSlice.reducer;
export const cakeActions = cakeSlice.actions;
