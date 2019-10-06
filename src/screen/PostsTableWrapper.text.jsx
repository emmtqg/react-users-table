import React from 'react';

// Using testing-library/react (replacing enzyme,
// primarily focus of lib is integration testing)
import '@testing-library/jest-dom/extend-expect'

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import { render, fireEvent, wait } from '@testing-library/react'

import { MemoryRouter as Router } from "react-router-dom";

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxThunkReducer from '../reducers/reducer';
import fetchPostsAction from '../actions/actionPosts';
import { Routes } from "./App";
import { testPosts } from '../utils/testPosts';

import PostsTableWrapper from './PostsTableWrapper';

const fetchPostsMock = jest.mock(fetchPostsAction, () => {
  return testPosts;
});

const createTestStore = () => {
  const middlewares = [thunk];
  const initialState = {
    items: null,
    itemsPosts: null,
    pending: true,
    error: false,
    pendingPosts: true,
    errorPosts: false,
  };

  const store = createStore(reduxThunkReducer, initialState, applyMiddleware(...middlewares));;

  return store;
}

// Redux
const middlewares = [thunk];
const initialState = {
  items: null,
  itemsPosts: null,
  pending: true,
  error: false,
  pendingPosts: true,
  errorPosts: false,
};
const store = createStore(reduxThunkReducer, initialState, applyMiddleware(...middlewares));


const renderWithRouter = (children, initialEntries = ["/"]) => {
  return render(<Provider store={store}><Router initialEntries={initialEntries}>{children}</Router></Provider>);
};

describe('Posts Table Wrapper ', () => {
  test('Loading will initiate an API call and waits for Posts array of the test user to be returned', async () => {

    expect.assertions(2);

    const App = () => {
      return(
      <Provider store={createTestStore()}>
        <PostsTableWrapper />
      </Provider>)
    };

    const { getByText } = render(<App />);
    var regexBody = new RegExp(testPosts[0].body, "i")
    var regexTitle = new RegExp(testPosts[0].title, "i");
    await wait(() => {
        expect(getByText(regexTitle)).toBeTruthy();
        expect(getByText(regexBody)).toBeTruthy();
    });
  });

  it('loads the home page when "Home Button clicked', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText(/home/i))
    expect(true).toBeTruthy();
  });
});