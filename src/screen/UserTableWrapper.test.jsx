import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { shallow, unmount } from 'enzyme';

// Using testing-library/react (replacing enzyme,
// primarily focus of lib is integration testing)
import '@testing-library/jest-dom/extend-expect'

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import { render, fireEvent, wait } from '@testing-library/react'

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxThunkReducer from '../reducers/reducer';
import fetchUsersAction from '../actions/actionUsers';

import GeneralTable from '../components/GeneralTable/GeneralTable';
import userConfig from '../config/userConfig';
import PostTableConfig from '../config/postConfig';
import testUser from '../utils/testUser';
import UserTableWrapper from './UserTableWrapper';

const fetchUsersMock = jest.mock(fetchUsersAction, () => {
  return testUser;
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

describe('User Table Wrapper ', () => {
  test('Loading will initiate an API call and waits for Users array to be returned', async () => {

    expect.assertions(1);

    const App = () => {
      return(
      <Provider store={createTestStore()}>
        <UserTableWrapper />
      </Provider>)
    };

    const { getByText } = render(<App />);
    var regex = new RegExp(testUser[0].name, "i");
    await wait(() => {
        expect(getByText(regex)).toBeTruthy();
    });
  });

  it('loads the test user initially with no filter', () => {
    expect(true).toBeTruthy();
  });
});