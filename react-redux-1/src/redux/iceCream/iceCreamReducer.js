import { BUY_ICE_CREAM } from "./iceCreamTypes";

const initIceCream = {
  numberOfIceCreams: 10
}

const iceCreamReducer = (prevState = initIceCream, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case BUY_ICE_CREAM:
      newState.numberOfIceCreams = prevState.numberOfIceCreams - action.quantity
      break;
    default:
      return newState;
  }

  return newState;
}

export default iceCreamReducer;
