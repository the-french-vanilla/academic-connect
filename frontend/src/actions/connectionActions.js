import axios from "axios";
import { GET_ERRORS, SET_NUM_CONNECTIONS } from "./types";

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

