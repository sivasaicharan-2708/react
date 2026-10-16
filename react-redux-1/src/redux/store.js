import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import cakeReducer from './cake/cakeReducer';
import iceCreamReducer from './iceCream/iceCreamReducer';
import userReducer from './users/userReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({ cake: cakeReducer, iceCream: iceCreamReducer , user: userReducer});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
