import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import socketIOMiddleware from 'middlewares/socket-io-middleware';
import thunk from 'redux-thunk';


const configureStore = (initialState) => {
  
  const socketMW = socketIOMiddleware();
  const middlewares = [socketMW, thunk];

  let enhancer;
  if (__DEV__) {
    let devToolsExtension = f => f;
    if (__BROWSER__) {
      devToolsExtension = typeof window.devToolsExtension === "function" ? window.devToolsExtension() : f => f;
    };
    enhancer = compose(applyMiddleware(...middlewares), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middlewares);

  };

  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
