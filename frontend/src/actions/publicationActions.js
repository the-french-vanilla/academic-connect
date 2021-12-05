import axios from "axios";
import { GET_ERRORS, SET_NUM_PUBLICATIONS, GET_ALL_PUBLICATIONS, CREATE_NEW_PUBLICATION,
  UPDATE_PUBLICATION, DELETE_PUBLICATION } from "./types";

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

export const createNewPublication = (title, date, authors, username) => async dispatch => {
  await axios.post("http://localhost:8081/api/publication", { title, date, authors });
  dispatch({
    type: CREATE_NEW_PUBLICATION,
    payload: {}
  });
  dispatch(getAllPublications(username));
  window.$('#modalAddPublicationForm').modal('hide');
};

export const getAllPublications = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/publication/all/" + username);
  dispatch({
    type: GET_ALL_PUBLICATIONS,
    payload: res.data
  });
};

export const updatePublication = (id, title, date, authors, username) => async dispatch => {
  await axios.put("http://localhost:8081/api/publication", { id, title, date, authors });
  dispatch({
    type: UPDATE_PUBLICATION,
    payload: {}
  });
  dispatch(getAllPublications(username));
  window.$('#modalUpdatePublicationForm').modal('hide');
};

export const deletePublication = (id, username) => async dispatch => {
  await axios.delete("http://localhost:8081/api/publication/" + id);
  dispatch({
    type: DELETE_PUBLICATION,
    payload: {}
  });
  dispatch(getAllPublications(username));
  window.$('#modalDeletePublicationForm').modal('hide');
};