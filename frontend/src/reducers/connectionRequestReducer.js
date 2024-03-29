import { SEND_CONNECTION_REQUEST, CHECK_CONNECTION_REQUEST_SENT, 
  CHECK_CONNECTION_REQUEST_RECEIVED,
  GET_SEND_CONNECTION_REQUESTS, GET_RECEIVED_CONNECTION_REQUESTS,
  ACCEPT_CONNECTION_REQUEST, DELETE_CONNECTION_REQUEST, CANCEL_CONNECTION_REQUEST } from "../actions/types";

const initialState = {
  connectionRequestSent: false,
  connectionRequestReceived: false,
  sentConnectionRequests: [],
  receivedConnectionRequests: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_CONNECTION_REQUEST:
      return {
        ...state,
        connectionRequestSent: true,
      };
    case CHECK_CONNECTION_REQUEST_SENT:
      return {
        ...state,
        connectionRequestSent: action.payload,
      };
    case CHECK_CONNECTION_REQUEST_RECEIVED:
      return {
        ...state,
        connectionRequestReceived: action.payload,
      };
    case GET_SEND_CONNECTION_REQUESTS:
      return {
        ...state,
        sentConnectionRequests: action.payload,
      };
    case GET_RECEIVED_CONNECTION_REQUESTS:
      return {
        ...state,
        receivedConnectionRequests: action.payload,
      };
    case ACCEPT_CONNECTION_REQUEST:
        return {
          ...state,
        };
    case DELETE_CONNECTION_REQUEST:
      return {
        ...state,
      };
    case CANCEL_CONNECTION_REQUEST:
      return {
        ...state,
      };

    default:
      return state;
  }
}