import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import {thunk} from 'redux-thunk';

const initialState = {
  isLoading: false,
  data: [],
  error: null
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST
});

export const fetchUserRequestSuccessful = (payload) => ({
  type: FETCH_USER_REQUEST_SUCCESS,
  payload
});

export const fetchUserRequestFailure = (payload) => ({
  type: FETCH_USER_REQUEST_FAILURE,
  payload
})

const reducer = (prevState = initialState, action) => {
  const newState = { ...prevState }

  switch (action.type) {
    case FETCH_USER_REQUEST:
      newState.isLoading = true;
      break;

    case FETCH_USER_REQUEST_SUCCESS:
      newState.isLoading = false;
      newState.data = action.payload;
      break;

    case FETCH_USER_REQUEST_FAILURE:
      newState.isLoading = false;
      newState.data = []
      newState.error = action.payload;
      break;
  }

  return newState;
}

const store = createStore(reducer, applyMiddleware(thunk));

console.log("Initial state ===>", store.getState());
store.subscribe(() => {
  console.log("updated state ===>",store.getState());
})

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios('https://jsonplaceholder.typicode.com/usrs')
      .then(response => response.data)
      .then(users => dispatch(fetchUserRequestSuccessful(users.map(({id}) => id))))
      .catch(error => dispatch(fetchUserRequestFailure(error.message)))
  }
}

store.dispatch(fetchUsers());
