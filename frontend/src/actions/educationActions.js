import axios from "axios";
import { CREATE_NEW_EDUCATION, GET_ALL_EDUCATIONS } from "./types";

export const createNewEducation = (newEducation) => async dispatch => {
  await axios.post("http://localhost:8081/api/education", newEducation);
  dispatch({
    type: CREATE_NEW_EDUCATION,
    payload: {}
  });
  dispatch(getAllEducations());
};

export const getAllEducations = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/education/all");
  dispatch({
    type: GET_ALL_EDUCATIONS,
    payload: res.data
  });
};