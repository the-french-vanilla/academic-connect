import axios from "axios";
import { CREATE_NEW_POST, GET_ALL_POSTS } from "./types";

export const createNewPost = (newPost) => async dispatch => {
  await axios.post("http://localhost:8081/api/post", newPost);
    dispatch({
      type: CREATE_NEW_POST,
      payload: {}
    });
};

export const getAllPosts = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/post/all");
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    });
};