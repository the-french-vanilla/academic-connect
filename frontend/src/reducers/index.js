import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import postReducer from "./postReducer";
import connectionReducer from "./connectionReducer";
import connectionRequestReducer from "./connectionRequestReducer";
import groupReducer from "./groupReducer";
import publicationReducer from "./publicationReducer";
import contactReducer from "./contactReducer";
import chatMessageReducer from "./chatMessageReducer";
import educationReducer from "./educationReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  postReducer: postReducer,
  connectionReducer: connectionReducer,
  connectionRequestReducer: connectionRequestReducer,
  groupReducer: groupReducer,
  publicationReducer: publicationReducer,
  contactReducer: contactReducer,
  chatMessageReducer: chatMessageReducer,
  educationReducer: educationReducer,
  userProfileReducer: userProfileReducer,
});