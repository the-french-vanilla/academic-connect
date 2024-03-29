import axios from "axios";
import { GET_ERROR_MESSAGE, GET_ERRORS, SET_CURRENT_USER, CLEAR_ERROR_MESSAGE,
  GET_PROFILE_PICTURE, UPDATE_CURRENT_USER, GET_CURRENT_USERS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("http://localhost:8081/api/users/register", newUser);
    history.push("/");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("http://localhost:8081/api/users/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);

    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERROR_MESSAGE,
      // payload: err.response.data
      payload: err.message
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};

export const clearErrorMessage = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR_MESSAGE,
    payload: {}
  });
};

export const getProfilePicture = (username) => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/users/profilepicture/" + username);
    dispatch({
      type: GET_PROFILE_PICTURE,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const updateCurrentUser = (currentUser) => async dispatch => {
  await axios.put("http://localhost:8081/api/users", currentUser);
  dispatch({
    type: UPDATE_CURRENT_USER,
    payload: {}
  });
};



// export const getCurrentUser = () => async dispatch => {
//   const res = await axios.get("http://localhost:8081/api/users");
//   dispatch({
//     type: GET_CURRENT_USERS,
//     payload: res.data
//   });
// };