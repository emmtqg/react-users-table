import { FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from '../actions/actionUsers';
import { FETCH_POSTS_PENDING, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR } from '../actions/actionPosts';

let initialState = {
  items: [],
  pending: true,
  error: false,
};

function reduxThunkReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
        return {
          ...state,
          pending: true
      }
    case FETCH_POSTS_PENDING:
      return {
          ...state,
          pendingPosts: true
      }
    case FETCH_USERS_ERROR:
        return {
          ...state,
          pending: false,
          error: action.error
      }
    case FETCH_POSTS_ERROR:
      return {
          ...state,
          pendingPosts: false,
          errorPosts: action.error
      }
    case FETCH_USERS_SUCCESS:
        return {
          ...state,
          pending: false,
          items: action.items
      }
    case FETCH_POSTS_SUCCESS:
      return {
          ...state,
          pendingPosts: false,
          itemsPosts: action.itemsPosts
      }

    default: 
      return state;
  }
}

export const getUsers = state => state.items;
export const getUsersPending = state => state.pending;
export const getUsersError = state => state.error;

export const getPosts = state => state.itemsPosts;
export const getPostsPending = state => state.pendingPosts;
export const getPostsError = state => state.errorPosts;

export default reduxThunkReducer;
