import { SET_NUM_CONNECTIONS } from "../actions/types";

const initialState = {
  numConnections: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NUM_CONNECTIONS:
      return {
        ...state,
        numConnections: action.payload,
      };

    default:
      return state;
  }
}