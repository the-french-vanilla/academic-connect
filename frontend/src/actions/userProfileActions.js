import axios from "axios";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "./types";

export const getUserProfile = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/profile/" + username);
  dispatch({
    type: GET_USER_PROFILE,
    payload: res.data
  });
};

export const updateUserProfile = (userId) => async dispatch => {
  const res = await axios.patch("http://localhost:8081/api/profile/" + userId);
  dispatch({
    type: UPDATE_USER_PROFILE,
    payload: res.data
  });
};