import { GET_ALL_CONNECTIONS, SET_NUM_CONNECTIONS, SET_IS_CONNECTED, UNCONNECT } from "../actions/types";

const initialState = {
  connections: [],
  numConnections: 0,
  isConnected: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONNECTIONS:
      return {
        ...state,
        connections: action.payload,
      };
    case SET_NUM_CONNECTIONS:
      return {
        ...state,
        numConnections: action.payload,
      };
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload,
      }
    case UNCONNECT:
      return {
        ...state,
      }

    default:
      return state;
  }
}