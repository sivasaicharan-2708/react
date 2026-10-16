import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../redux/userSlice';

const Users = () => {
  const { loading: isLoading, users, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(isLoading, users, error);

  useEffect(() => {
    dispatch(fetchUsers())
  },[dispatch])

  return isLoading ? <h1>...</h1> :
  (error ? error.message :
    <div>
      <h1>Users List</h1>
      <ul>
        {(users || []).map((user, index) => <li key={index}>{ user }</li>)}
      </ul>
    </div>
  )
}

export default Users;
