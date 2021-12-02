import { SET_NUM_PUBLICATIONS, GET_ALL_PUBLICATIONS } from "../actions/types";

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
    case GET_ALL_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
      };

    default:
      return state;
  }
}