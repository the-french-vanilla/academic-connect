import axios from "axios";
import { GET_ERRORS, SET_FIRST_CONTACT_ID, SET_FIRST_OTHER_CONTACT_ID, GET_ALL_CONTACTS } from "./types";

export const getFirstContactId = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/contact/firstContactId");
    dispatch({
      type: SET_FIRST_CONTACT_ID,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getFirstOtherContactId = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8081/api/contact/firstOtherContactId");
    dispatch({
      type: SET_FIRST_OTHER_CONTACT_ID,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getAllContacts = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/contact/all");
  dispatch({
    type: GET_ALL_CONTACTS,
    payload: res.data
  });
};

// export const getNumberOfConnections = () => async dispatch => {
//   try {
//     const res = await axios.get("http://localhost:8081/api/connection/number");
//     dispatch({
//       type: SET_NUM_CONNECTIONS,
//       payload: res.data
//     });
//   } catch (err) {
//     // dispatch({
//     //   type: GET_ERRORS,
//     //   payload: err.response.data
//     // });
//   }
// };

