import axios from "axios"

const fetchUserRequest = () => ({
  type: 'LIST_USERS_REQ'
})

const fetchUserReqSuccess = (payload) => ({
  type: 'LIST_USERS_SUCCESS',
  payload
})

const fetchUserError = (payload) => ({
  type: 'LIST_USER_FAILURE',
  payload
})

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUserRequest())
    axios('https://jsonplaceholder.typicode.com/users')
      .then(response => response.data)
      .then(users => {
        const names = users.map(user => user.name);
        return dispatch(fetchUserReqSuccess(names))
      })
      .catch(err => dispatch(fetchUserError(err.message)))
  }
}
