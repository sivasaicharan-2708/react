import { useSelector, useDispatch } from 'react-redux'
import { buyIceCream } from './../redux/iceCream/iceCreamActions'

export default function IceCreamContainer(props) {
  const numberOfIceCreams = useSelector(state => state.iceCream.numberOfIceCreams);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Number of ice creams: { numberOfIceCreams }</h2>
      <button onClick={() => dispatch(buyIceCream())}>Buy Ice Cream</button>
    </div>
  )
}
