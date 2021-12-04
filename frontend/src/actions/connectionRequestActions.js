import axios from "axios";
import { GET_ERRORS, SEND_CONNECTION_REQUEST, CHECK_CONNECTION_REQUEST_SENT,
  CHECK_CONNECTION_REQUEST_RECEIVED,
  GET_SEND_CONNECTION_REQUESTS, GET_RECEIVED_CONNECTION_REQUESTS,
  ACCEPT_CONNECTION_REQUEST, DELETE_CONNECTION_REQUEST, CANCEL_CONNECTION_REQUEST } from "./types";
import { getUserProfile } from "./userProfileActions";
import { getAllConnections, getIsConnected } from "./connectionActions";
import { searchUserProfiles } from "./userProfileActions";

export const sendConnectionRequest = (username2, username, page, q) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/", { "username": username2 });
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

  if (page === 'connections') {
    dispatch(getReceivedConnectionRequests(username));
  } else if (page === 'userProfile') {
    dispatch(getUserProfile(username));
    dispatch(getIsConnected(username));
    dispatch(getAllConnections(username));
  } else if (page === 'searchResults') {
    dispatch(searchUserProfiles(q));
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

export const acceptConnectionRequest = (username2, username, page, q) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/accept", { "username": username2 });
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

  dispatch(searchUserProfiles(q)); // 

  if ('connectionRequest') {
    dispatch(getReceivedConnectionRequests(username));
  } else if (page === 'userProfile') {
    dispatch(getUserProfile(username));
    dispatch(getIsConnected(username));
    dispatch(getAllConnections(username));
  } else if (page === 'searchResults') {
    dispatch(searchUserProfiles(q));
  }
};

export const deleteConnectionRequest = (username2, username, page, q) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connectionrequest/delete", { "username": username2 });
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

  dispatch(searchUserProfiles(q)); // 

  if ('connectionRequest') {
    dispatch(getReceivedConnectionRequests(username));
  } else if (page === 'userProfile') {
    dispatch(getUserProfile(username));
    dispatch(getIsConnected(username));
    dispatch(getAllConnections(username));
  } else if (page === 'searchResults') {
    dispatch(searchUserProfiles(q));
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
