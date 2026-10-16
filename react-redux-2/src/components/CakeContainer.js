import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, refill } from "./../redux/cakesSlice";

const Cake = () => {
  const [refilCount, setRefilCount] = useState(1);
  const [buyCount, setBuyCount] = useState(1);
  const numberOfCakes = useSelector(state => state.cake.numberOfCakes);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Number of cakes: {numberOfCakes}</h1>
      <h5 style={{color: 'red'}}>Get 1 IceCraam for every 5 Cakes</h5>
      <div>
        <input type="number" value={buyCount} onChange={e => setBuyCount(Number.parseInt(e.target.value))} />
        <button onClick={() => dispatch(ordered(buyCount))}>Buy Cake</button>
      </div>
      <div>
        <input type="number" value={refilCount} onChange={e => setRefilCount(Number.parseInt(e.target.value))} />
        <button onClick={() => dispatch(refill(refilCount))}>Refill</button>
      </div>
    </div>
  )
}

export default Cake;
