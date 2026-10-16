import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  numberOfIceCreams: 10
}

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numberOfIceCreams -= action.payload
    }
  }
})

export const iceCreamActions = iceCreamSlice.actions;
export default iceCreamSlice.reducer;
