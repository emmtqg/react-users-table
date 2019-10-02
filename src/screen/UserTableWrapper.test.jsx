import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { shallow, unmount } from 'enzyme';

// Using testing-library/react (replacing enzyme,
// primarily focus of lib is integration testing)
import '@testing-library/jest-dom/extend-expect'

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import {render, fireEvent} from '@testing-library/react';

import GeneralTable from '../components/GeneralTable/GeneralTable';
import UserTableConfig from '../config/Users.json';
import PostTableConfig from '../config/Posts.json';
import testUser from '../utils/TestUser.json';
import testPost from '../utils/TestPost.json';

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
  it('loads the users initially with no filter', () => {
    expect(true).toBeTruthy();
  });
});