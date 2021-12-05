import { SET_NUM_PUBLICATIONS, GET_ALL_PUBLICATIONS, CREATE_NEW_PUBLICATION,
  UPDATE_PUBLICATION, DELETE_PUBLICATION } from "../actions/types";

const initialState = {
  numPublications: 0,
  publications: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NUM_PUBLICATIONS:
      return {
        ...state,
        numPublications: action.payload,
      };
    case CREATE_NEW_PUBLICATION:
      return {
        ...state,
      };
    case GET_ALL_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
      };
    case UPDATE_PUBLICATION:
      return {
        ...state,
      };
    case DELETE_PUBLICATION:
      return {
        ...state,
      };

    default:
      return state;
  }
}