// Actions

const BUY_CAKE = 'BUY_CAKE';

// I want to tell give me 5 chocklet cakes.
// the only goal of this is to tell reducer exactly what to do so that it can perform exact action.
// it cant be in this format
const buyCakeAction = (quantity = 1) => ({
  type: BUY_CAKE,
  quantity
})



const initialState = {
  numberOfCakes: 10
}

const cakeReducer = (prevState = initialState, action) => {
  const newState = {...prevState}
  switch (action.type) {
    case BUY_CAKE: {
      const cakesRemaining = prevState.numberOfCakes - action.quantity;
      if (cakesRemaining < 0) {
        throw new Error(`${action.quantity} cakes are not available`);
      }
      newState.numberOfCakes = cakesRemaining;
    }
  }

  return newState;
}

export default {
  cakeReducer,
  actions: {
    buyCakeAction
  }
}
