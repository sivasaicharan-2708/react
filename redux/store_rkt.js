import { configureStore } from '@reduxjs/toolkit'
import cakeReducer, { cakeActions } from './cakes_rkt.js';
import iceCreamReducer, { iceCreamActions } from './iceCream_rkt.js';

const logger = store => next => action => {
  const oldState = store.getState();
  const result = next(action);
  console.log("old State", oldState);
  console.log("Action", result);
  console.log("New state", store.getState());
  console.log("===================");
  return result;
}

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


const initialStore = store.getState();

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(cakeActions.ordered(1))
store.dispatch(cakeActions.ordered(1))
store.dispatch(cakeActions.ordered(1))
store.dispatch(cakeActions.ordered(2))

store.dispatch(iceCreamActions.ordered(1))
store.dispatch(iceCreamActions.ordered(1))
store.dispatch(iceCreamActions.ordered(1))
store.dispatch(iceCreamActions.ordered(2))
