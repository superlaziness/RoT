import { combineReducers } from "redux";
import testReducer from "./testReducer";
import rotReducer from "./rotReducer";

export default combineReducers({
  testReducer,
  rotReducer,
});