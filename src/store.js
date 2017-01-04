import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "reducers";

const middlewares = [];
const configureStore = (initialState) => {
  let enhancer;
  if (__DEV__) {
    let devToolsExtension = f => f;
    if (__BROWSER__) {
      devToolsExtension = typeof window.devToolsExtension === "function" ? window.devToolsExtension() : f => f;
    }
    enhancer = compose(applyMiddleware(...middlewares), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middlewares);
  };
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
