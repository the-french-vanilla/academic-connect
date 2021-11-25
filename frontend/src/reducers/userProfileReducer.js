import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "../actions/types";

const initialState = {
  userProfile: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };

    default:
      return state;
  }
}