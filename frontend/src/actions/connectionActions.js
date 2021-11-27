import axios from "axios";
import { GET_ERRORS, GET_ALL_CONNECTIONS, SET_NUM_CONNECTIONS, SET_IS_CONNECTED, UNCONNECT } from "./types";
import { checkConnectionRequestSent, checkConnectionRequestReceived } from './connectionRequestActions';

export const getAllConnections = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connection/all");
    dispatch({
      type: GET_ALL_CONNECTIONS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getNumberOfConnections = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connection/number");
    dispatch({
      type: SET_NUM_CONNECTIONS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getIsConnected = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/connection/" + username + "/connected");
    dispatch({
      type: SET_IS_CONNECTED,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }

  dispatch(checkConnectionRequestSent(username));
  dispatch(checkConnectionRequestReceived(username));
};

export const unconnect = (username) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8081/api/connection/unconnect", { username });
    dispatch({
      type: UNCONNECT,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
  dispatch(getAllConnections());
};