import { SET_NUM_GROUPS } from "../actions/types";

const initialState = {
  numGroups: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NUM_GROUPS:
      return {
        ...state,
        numGroups: action.payload,
      };

    default:
      return state;
  }
}