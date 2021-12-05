import axios from "axios";
import { CREATE_NEW_POST, GET_ALL_POSTS, GET_ALL_POSTS_IN_FEED, DELETE_POST } from "./types";

export const createNewPost = (newPost, page, username) => async dispatch => {
  await axios.post("http://localhost:8081/api/post", newPost);
  dispatch({
    type: CREATE_NEW_POST,
    payload: {}
  });

  if (page === 'feeds') {
    dispatch(getAllPostsInFeed());
  } else if (page === 'userProfile') {
    dispatch(getAllPosts(username));
  }
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
  dispatch({
    type: GET_ALL_POSTS_IN_FEED,
    payload: res.data
  });
};

export const deletePost = (postId, page, username) => async dispatch => {
  const res = await axios.delete("http://localhost:8081/api/post/" + postId);
  dispatch({
    type: DELETE_POST,
    payload: res.data
  });

  if (page === 'feeds') {
    dispatch(getAllPostsInFeed());
  } else if (page === 'userProfile') {
    dispatch(getAllPosts(username));
  }
};