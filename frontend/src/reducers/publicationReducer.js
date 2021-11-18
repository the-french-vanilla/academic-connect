import { SET_NUM_PUBLICATIONS } from "../actions/types";

const initialState = {
  numPublications: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NUM_PUBLICATIONS:
      return {
        ...state,
        numPublications: action.payload,
      };

    default:
      return state;
  }
}