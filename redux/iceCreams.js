// Actions
const BUY_ICE_CREAMS = 'BUY_ICE_CREAMS';

const buyIceCream = (quantity = 1) => {
  return {
    type: BUY_ICE_CREAMS,
    quantity
  }
}


const initialIceCreamState = {
  numberOfIceCreams: 10
}

const iceCreamReducer = (prevState = initialIceCreamState, action) => {
  const newState = { ...prevState }
  switch (action.type) {
    case BUY_ICE_CREAMS:
      newState.numberOfIceCreams = prevState.numberOfIceCreams - action.quantity
  }

  return newState;
}

export default {
  iceCreamReducer,
  actions: {
    buyIceCream
  }
}
