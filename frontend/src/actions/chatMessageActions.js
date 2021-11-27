import axios from "axios";
import { GET_ERRORS, CREATE_NEW_CHAT_MESSAGE, GET_ALL_CHAT_MESSAGES } from "./types";

// export const createNewChatMessage = (newChatMessage, firstContactId, firstOtherContactId) => async dispatch => {
//   await axios.post("http://localhost:8081/api/message", newChatMessage);
//   dispatch({
//     type: CREATE_NEW_CHAT_MESSAGE,
//     payload: {}
//   });
//   dispatch(getAllChatMessages(firstContactId, firstOtherContactId));
// };

export const createNewChatMessage = (text, username, contactId, otherContactId) => async dispatch => {
  const newChatMessage = {
    text: text,
    username: username,
    contactId: contactId,
  };
  await axios.post("http://localhost:8081/api/message", newChatMessage);
  dispatch({
    type: CREATE_NEW_CHAT_MESSAGE,
    payload: {}
  });
  dispatch(getAllChatMessages(contactId, otherContactId));
};

export const getAllChatMessages = (firstContactId, firstOtherContactId) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/message/user1/" + firstContactId + "/user2/" + firstOtherContactId);
  dispatch({
    type: GET_ALL_CHAT_MESSAGES,
    payload: res.data
  });
};
