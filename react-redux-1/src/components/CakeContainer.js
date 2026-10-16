import { useDispatch, useSelector } from 'react-redux';
import { buyCake } from './../redux/cake/cakeActions';

export default  function CakeContainer(props) {
  const numnerOfCakes = useSelector(state => state.cake.numberOfCakes)
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes: { numnerOfCakes }</h2>
      <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
    </div>
  )
}
