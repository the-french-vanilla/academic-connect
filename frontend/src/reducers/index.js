import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import postReducer from "./postReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  postReducer: postReducer,
});