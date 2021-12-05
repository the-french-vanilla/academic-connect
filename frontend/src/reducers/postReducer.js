import { CREATE_NEW_POST, GET_ALL_POSTS, GET_ALL_POSTS_IN_FEED, DELETE_POST } from "../actions/types";

const initialState = {
  posts: [],
  // post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_POST:
      return {
        ...state,
        // post: action.payload
      };

    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case GET_ALL_POSTS_IN_FEED:
      return {
        ...state,
        posts: action.payload
      };

    case DELETE_POST:
      return {
        ...state,
      };

    default:
      return state;
  }
}