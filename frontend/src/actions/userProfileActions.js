import axios from "axios";
import { GET_USER_PROFILE, SEARCH_USER_PROFILES, UPDATE_USER_PROFILE } from "./types";
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

export const searchUserProfiles = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/profile/search/" + username);
  dispatch({
    type: SEARCH_USER_PROFILES,
    payload: res.data
  });
};

export const updateUserProfile = (headline, about, username) => async dispatch => {
  const res = await axios.patch("http://localhost:8081/api/profile", {headline, about});
  dispatch({
    type: UPDATE_USER_PROFILE,
    payload: res.data
  });
  dispatch(getUserProfile(username, username));
  window.$('#modalUpdateHeadlineAboutForm').modal('hide');
};