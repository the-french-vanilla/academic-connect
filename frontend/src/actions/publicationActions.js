import axios from "axios";
import { GET_ERRORS, SET_NUM_PUBLICATIONS, GET_ALL_PUBLICATIONS } from "./types";

export const getNumberOfPublications = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/publication/number/" + username);
    dispatch({
      type: SET_NUM_PUBLICATIONS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getAllPublications = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/publication/all/" + username);
  dispatch({
    type: GET_ALL_PUBLICATIONS,
    payload: res.data
  });
};
