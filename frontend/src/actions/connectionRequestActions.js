import axios from "axios";
import { GET_ERRORS, SEND_CONNECTION_REQUEST, CHECK_CONNECTION_REQUEST_SENT,
  CHECK_CONNECTION_REQUEST_RECEIVED,
  GET_SEND_CONNECTION_REQUESTS, GET_RECEIVED_CONNECTION_REQUESTS,
  ACCEPT_CONNECTION_REQUEST, DELETE_CONNECTION_REQUEST, CANCEL_CONNECTION_REQUEST } from "./types";
import { getUserProfile } from "./userProfileActions";
import { getIsConnected } from "./connectionActions";
import { searchUserProfiles } from "./userProfileActions";

export const sendConnectionRequest = (username) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/", { username });
    dispatch({
      type: SEND_CONNECTION_REQUEST,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const checkConnectionRequestSent = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connectionrequest/" + username + "/checksent");
    dispatch({
      type: CHECK_CONNECTION_REQUEST_SENT,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const checkConnectionRequestReceived = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connectionrequest/" + username + "/checkreceived");
    dispatch({
      type: CHECK_CONNECTION_REQUEST_RECEIVED,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getSentConnectionRequests = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connectionrequest/sendrequests");
    dispatch({
      type: GET_SEND_CONNECTION_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getReceivedConnectionRequests = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connectionrequest/receivedrequests");
    dispatch({
      type: GET_RECEIVED_CONNECTION_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const acceptConnectionRequest = (username, page) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/accept", { username });
    dispatch({
      type: ACCEPT_CONNECTION_REQUEST,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }

  if (page === 'connections') {
    dispatch(getReceivedConnectionRequests(username));
  } else if (page === 'userProfile') {
    dispatch(getUserProfile(username));
    dispatch(getIsConnected(username));
  } else if (page === 'searchResults') {
    dispatch(searchUserProfiles(username));
  }
};

export const deleteConnectionRequest = (username, page) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/delete", { username });
    dispatch({
      type: DELETE_CONNECTION_REQUEST,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }

  if (page === 'connections') {
    dispatch(getReceivedConnectionRequests(username));
  } else if (page === 'userProfile') {
    dispatch(getUserProfile(username));
    dispatch(getIsConnected(username));
  }
};

export const cancelConnectionRequest = (username) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/cancel", { username });
    dispatch({
      type: CANCEL_CONNECTION_REQUEST,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
  dispatch(getSentConnectionRequests(username));
};
