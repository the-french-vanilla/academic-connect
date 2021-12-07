import { GET_USER_PROFILE, SEARCH_USER_PROFILES, UPDATE_USER_PROFILE,
  GET_USER_PROFILES_BY_ID } from "../actions/types";

const initialState = {
  userProfile: null,
  userProfiles: [],
  userProfilesSuggestion: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    case SEARCH_USER_PROFILES:
      return {
        ...state,
        userProfiles: action.payload
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    case GET_USER_PROFILES_BY_ID:
      return {
        ...state,
        userProfilesSuggestion: action.payload
      };

    default:
      return state;
  }
}