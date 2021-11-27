import axios from "axios";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "./types";
import { getIsConnected } from './connectionActions';

export const getUserProfile = (username2, username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/profile/" + username2);
  dispatch({
    type: GET_USER_PROFILE,
    payload: res.data
  });

  if (username !== username2) {
    dispatch(getIsConnected(username2));
  }
};

export const updateUserProfile = (userId) => async dispatch => {
  const res = await axios.patch("http://localhost:8081/api/profile/" + userId);
  dispatch({
    type: UPDATE_USER_PROFILE,
    payload: res.data
  });
};