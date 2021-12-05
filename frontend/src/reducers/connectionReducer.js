import { GET_ALL_CONNECTIONS, SET_NUM_CONNECTIONS, SET_IS_CONNECTED, UNCONNECT,
  GET_MUTUAL_CONNECTIONS, SET_NUM_MUTUAL_CONNECTIONS } from "../actions/types";

const initialState = {
  connections: [],
  mutualConnections: [],
  numConnections: 0,
  numMutualConnections: 0,
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
    case GET_MUTUAL_CONNECTIONS:
      return {
        ...state,
        mutualConnections: action.payload,
      };
    case SET_NUM_MUTUAL_CONNECTIONS:
      return {
        ...state,
        numMutualConnections: action.payload,
      };

    default:
      return state;
  }
}