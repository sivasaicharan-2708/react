import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, refill } from './../redux/iceCreamSlice';

const IceCream = () => {
  const [refillCount, setRefill] = useState(1);
  const numberOfIceCreams = useSelector(state => state.iceCream.numberOfIceCreams);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Number of IceCreams: {numberOfIceCreams}</h1>
      <button onClick={() => dispatch(ordered())}>Buy IceCream</button>
      <div>
        <input type="number" value={refillCount} onChange={e => setRefill(Number.parseInt(e.target.value))} />
        <button onClick={() => dispatch(refill(refillCount))}>Refill</button>
      </div>
    </div>
  )
}

export default IceCream;
