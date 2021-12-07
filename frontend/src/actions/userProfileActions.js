import axios from "axios";
import { GET_USER_PROFILE, SEARCH_USER_PROFILES, UPDATE_USER_PROFILE,
  GET_USER_PROFILES_BY_ID } from "./types";
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

export const getUserProfilesById = (ids) => async dispatch => {
  // Create an object of formData
  // const formData = new FormData();
  // formData.append("ids", ids);

  const res = await axios.get("http://localhost:8081/api/profile/ids/" + ids);
  dispatch({
    type: GET_USER_PROFILES_BY_ID,
    payload: res.data
  });
  // console.log(res.data)
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