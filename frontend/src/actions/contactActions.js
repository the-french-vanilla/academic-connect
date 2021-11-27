import axios from "axios";
import { GET_ERRORS, SET_FIRST_CONTACT_ID, SET_FIRST_OTHER_CONTACT_ID, 
  GET_ALL_CONTACTS, GET_CONTACT, GET_OTHER_CONTACT_ID,
  CREATE_CONTACT_IF_NOT_EXIST } from "./types";
import { getAllChatMessages } from './chatMessageActions';

// export const getFirstContactId = () => async dispatch => {
//   try {
//     const res = await axios.get("http://localhost:8081/api/contact/firstContactId");
//     dispatch({
//       type: SET_FIRST_CONTACT_ID,
//       payload: res.data
//     });
//   } catch (err) {
//     // dispatch({
//     //   type: GET_ERRORS,
//     //   payload: err.response.data
//     // });
//   }
// };

// export const getFirstOtherContactId = () => async dispatch => {
//   try {
//     const res = await axios.get("http://localhost:8081/api/contact/firstOtherContactId");
//     dispatch({
//       type: SET_FIRST_OTHER_CONTACT_ID,
//       payload: res.data
//     });
//   } catch (err) {
//     // dispatch({
//     //   type: GET_ERRORS,
//     //   payload: err.response.data
//     // });
//   }
// };

export const getAllContacts = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/contact/all");
  dispatch({
    type: GET_ALL_CONTACTS,
    payload: res.data
  });
};

export const getContact = (contactId) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/contact/" + contactId);
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  });
  dispatch(getOtherContactId(contactId));
};

export const getOtherContactId = (contactId) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/contact/" + contactId + "/othercontactid");
  dispatch({
    type: GET_OTHER_CONTACT_ID,
    payload: res.data
  });
  dispatch(getAllChatMessages(contactId, res.data));
};

export const createContactIfNotExist = (username, history) => async dispatch => {
  const res = await axios.post("http://localhost:8081/api/contact/createifnotexist", { username });
  dispatch({
    type: CREATE_CONTACT_IF_NOT_EXIST,
    payload: res.data
  });
  history.push("/messaging/thread/" + res.data.id);
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

