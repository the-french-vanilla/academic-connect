import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import postReducer from "./postReducer";
import connectionReducer from "./connectionReducer";
import groupReducer from "./groupReducer";
import publicationReducer from "./publicationReducer";
import contactReducer from "./contactReducer";
import chatMessageReducer from "./chatMessageReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  postReducer: postReducer,
  connectionReducer: connectionReducer,
  groupReducer: groupReducer,
  publicationReducer: publicationReducer,
  contactReducer: contactReducer,
  chatMessageReducer: chatMessageReducer,
});