import axios from "axios";
import { GET_ERRORS, SET_NUM_PUBLICATIONS } from "./types";

export const getNumberOfPublications = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/publication/number");
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

