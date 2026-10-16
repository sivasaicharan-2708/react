import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/users/userActions';

export default function Users() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const error = useSelector(state => state.user.error);
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (isLoading) return <h1>...</h1>
  if (error) return <h1> { error }</h1>
  if (users && users.length) {
    return <ul>{users.map((name, index) => <li key={index}>{ name }</li>)}</ul>
  }
}
