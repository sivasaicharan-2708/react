import { BUY_CAKE } from "./cakeTypes"

const initialState = {
  numberOfCakes: 10
}

const cakeReducer = (prevState = initialState, action) => {
  const newState = { ...prevState }

  switch (action.type) {
    case BUY_CAKE:
      newState.numberOfCakes = prevState.numberOfCakes - action.quantity;
      break;
    default:
      return newState;
  }

  return newState;
}

export default cakeReducer;
