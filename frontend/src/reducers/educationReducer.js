import { CREATE_NEW_EDUCATION, GET_ALL_EDUCATIONS } from "../actions/types";

const initialState = {
  educations: [],
  // post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_EDUCATION:
      return {
        ...state,
        // post: action.payload
      };

    case GET_ALL_EDUCATIONS:
      return {
        ...state,
        educations: action.payload
      };

    default:
      return state;
  }
}