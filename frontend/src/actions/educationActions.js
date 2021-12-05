import axios from "axios";
import { CREATE_NEW_EDUCATION, GET_ALL_EDUCATIONS, UPDATE_EDUCATION } from "./types";

export const createNewEducation = (institution, accreditation, startDate, endDate, description, username) => async dispatch => {
  await axios.post("http://localhost:8081/api/education", { institution, accreditation, startDate, endDate, description });
  dispatch({
    type: CREATE_NEW_EDUCATION,
    payload: {}
  });
  dispatch(getAllEducations(username));
  window.$('#modalAddEducationForm').modal('hide');
};

export const getAllEducations = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/education/all/" + username);
  dispatch({
    type: GET_ALL_EDUCATIONS,
    payload: res.data
  });
};

export const updateEducation = (id, institution, accreditation, startDate, endDate, description, username) => async dispatch => {
  await axios.put("http://localhost:8081/api/education", { id, institution, accreditation, startDate, endDate, description });
  dispatch({
    type: UPDATE_EDUCATION,
    payload: {}
  });
  dispatch(getAllEducations(username));
  window.$('#modalUpdateEducationForm').modal('hide');
};