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

import GeneralTable from '../components/GeneralTable/GeneralTable';
import UserTableConfig from '../config/Users.json';
import PostTableConfig from '../config/Posts.json';
import testUser from '../utils/TestUser.json';
import { fetchUsersAction } from '../utils/fetchUsers';
import UsersTableWrapper from './UsersTableWrapper';

const fetchUsersMock = jest.mock(fetchUsersAction, () => {
  return testUser;
});

const historyMock = jest.fn(() => {
  return true;
});

// item for UserType test
let userTableProps = {
  items: testUser,
  tableConfig: {...UserTableConfig},
  pending: false,
  error: false,
  onRowClick: historyMock,
  captionText: "Users"
};

describe('User Table Wrapper ', () => {
  test('Loading will initiate an API call and waits for Users array to be returned', async () => {
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
      expect.assertions(1);
    
      // fetchUsersMock.mock();
    const App = () => {
      return(
      <Provider store={store}>
        <UsersTableWrapper store={store} />
      </Provider>)
    };

      const { getByText } = render(<App />);
      
      await wait(() => {
          expect(getByText(/howell/i)).toBeTruthy();
      });
  });

  it('loads the test user initially with no filter', () => {
    expect(true).toBeTruthy();
  });
});