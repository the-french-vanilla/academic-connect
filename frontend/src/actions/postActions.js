import axios from "axios";
import { CREATE_NEW_POST, GET_ALL_POSTS, GET_ALL_POSTS_IN_FEED } from "./types";

export const createNewPost = (newPost) => async dispatch => {
  await axios.post("http://localhost:8081/api/post", newPost);
  dispatch({
    type: CREATE_NEW_POST,
    payload: {}
  });
  dispatch(getAllPostsInFeed());
};

export const getAllPosts = (username) => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/post/all/" + username);
  dispatch({
    type: GET_ALL_POSTS,
    payload: res.data
  });
};

export const getAllPostsInFeed = () => async dispatch => {
  const res = await axios.get("http://localhost:8081/api/post/allinfeed");
  console.log(res.data)
  dispatch({
    type: GET_ALL_POSTS_IN_FEED,
    payload: res.data
  });
};

