import { CREATE_NEW_CHAT_MESSAGE, GET_ALL_CHAT_MESSAGES } from "../actions/types";

const initialState = {
  chatMessages: [],
  // chatMessage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_CHAT_MESSAGE:
      return {
        ...state,
        // chatMessage: action.payload
      };

    case GET_ALL_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: action.payload,
      };

    default:
      return state;
  }
}