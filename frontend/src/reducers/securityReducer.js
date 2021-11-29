import { GET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE, SET_CURRENT_USER,
  GET_CURRENT_USERS } from "../actions/types";

const initialState = {
  validToken: false,
  user: {},
  errorMessage: '',
  currentUser: {},
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
        errorMessage: '',
      };
    case GET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: '',
      };
    case GET_CURRENT_USERS:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
}