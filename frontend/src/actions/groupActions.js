import axios from "axios";
import { GET_ERRORS, SET_NUM_GROUPS } from "./types";

export const getNumberOfGroups = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/group/number");
    dispatch({
      type: SET_NUM_GROUPS,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

