import { createStore, applyMiddleware, compose } from 'redux';
import { socketIOMiddleware, reducer } from 'rot';
import thunk from 'redux-thunk';


const configureStore = (initialState) => {
  const socketMW = socketIOMiddleware();
  const middlewares = [socketMW, thunk];

  let enhancer;
  if (__DEV__) {
    let devToolsExtension = f => f;
    if (__BROWSER__) {
      devToolsExtension = typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f;
    }
    enhancer = compose(applyMiddleware(...middlewares), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middlewares);
  }

  return createStore(reducer, initialState, enhancer);
};

export default configureStore;
