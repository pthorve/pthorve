/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './root-reducer';

const isClient = typeof window !== 'undefined';

export function getComposeEnhancers() {
  if (
    process.env.NODE_ENV !== 'production' &&
    isClient &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true });
  }
  return compose;
}

export default (history, initialState = {}) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const composeEnhancers = getComposeEnhancers();
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};
