import { applyMiddleware, combineReducers, createStore } from 'redux'
import cakes from './cakes.js'
import iceCreams from './iceCreams.js'

const { cakeReducer, actions: cakeActions } = cakes;
const { iceCreamReducer, actions: iceCreamsActions } = iceCreams;

// I need something that has a way to store the object(done)
// it shpuld provide a way so that actions can be dispatched(done)
// it should have a way to appoint the reducer(done)
// it should proved a way to returnt the store at any point in time(done)
// it should prove a way to appciatons to subscribe and unscbscript so that ween new state is avaible it should notify the subscriped application. (done)
//
// IN short i will give a metafor for this
//
// I bought a shop multi room big shop (redux package)
// every room needs some person and some items to be managed that is reducer with it initial state
// I will deifne some action like sell/refill/som other check to performed on that rooms items(Actions)
// do the same for all romes
// now make avaible the shop for public and i also advertise the esupported actions on that room (subscription)


// dispath(action)----->  Middleware ---------> Reducer
const logger = store => next => action => {
  const oldState = store.getState();
  const result = next(action);
  console.log("old State", oldState);
  console.log("Action", result);
  console.log("New state", store.getState());
  console.log("===================");
  return result;
}

const rootReducer = combineReducers({ cake: cakeReducer, iceCream: iceCreamReducer });
const store = createStore(rootReducer, applyMiddleware(logger));

const unsubscribe = store.subscribe((props) => {
  const cakes = store.getState().cake.numberOfCakes;
  const iceCreams = store.getState().iceCream.numberOfIceCreams;

  if (cakes <= 0 || iceCreams <= 0) {
    if (cakes <= 0) console.log("====== Cakes are empty please refill ======");
    else console.log("====== iceCreams are empty please refill ======");
    return;
  }

  console.log("Updated Count", {cakes, iceCreams});
})

store.dispatch(cakeActions.buyCakeAction(2));
store.dispatch(cakeActions.buyCakeAction(2))
store.dispatch(cakeActions.buyCakeAction(2))
store.dispatch(cakeActions.buyCakeAction(2))
store.dispatch(cakeActions.buyCakeAction(2))


store.dispatch(iceCreamsActions.buyIceCream(2))
store.dispatch(iceCreamsActions.buyIceCream(2))
store.dispatch(iceCreamsActions.buyIceCream(2))
store.dispatch(iceCreamsActions.buyIceCream(2))
store.dispatch(iceCreamsActions.buyIceCream(2))
store.dispatch(iceCreamsActions.buyIceCream(2))


unsubscribe();
