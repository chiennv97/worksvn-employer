import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';


const middlewares = [
  thunk
];

const enhancers = [];

// create store
const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(...middlewares),
    ...enhancers
  )
);
export default store;
