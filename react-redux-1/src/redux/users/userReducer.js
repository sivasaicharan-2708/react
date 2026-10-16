const initialState = {
  isLoading: false,
  users: [],
  error: ''
}

const userReducer = (prevState = initialState, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case 'LIST_USERS_REQ':
      newState.isLoading = true;
      break;
    case 'LIST_USERS_SUCCESS':
      newState.isLoading = false;
      newState.users = action.payload
      break;
    case 'LIST_USER_FAILURE':
      newState.isLoading = false;
      newState.error = action.payload
      break;
    default:
      return newState;
  }

  return newState;
}

export default userReducer;
