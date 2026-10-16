import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      return (res.data || []).map(user => user.name)
    })
    .catch(error => error.message)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (prevState, action) => {
      prevState.loading = true
    })

    builder.addCase(fetchUsers.fulfilled, (prevState, action) => {
      prevState.loading = false
      prevState.users = action.payload
    })

    builder.addCase(fetchUsers.rejected, (prevState, action) => {
      prevState.loading = false
      prevState.users = action.payload
    })
  }
})

export default userSlice.reducer;
