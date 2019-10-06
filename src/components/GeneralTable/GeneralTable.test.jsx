import React from 'react';
// import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { shallow, unmount } from 'enzyme';

// Using testing-library/react (replacing enzyme,
// primarily focus of lib is integration testing)
import '@testing-library/jest-dom/extend-expect'

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import {render, fireEvent} from '@testing-library/react';

import GeneralTable from './GeneralTable';
import { userConfig as UserTableConfig } from '../../config/userConfig';
import { postConfig as PostTableConfig } from '../../config/postConfig';
import testUser from '../../utils/testUser';
import testPost from '../../utils/testPosts';

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

let postTableProps = {
  items: testPost,
  tableConfig: {...PostTableConfig},
  pending: false,
  error: false,
  captionText: "Posts"
};

// enzyme tests - to be replaced with testing-library
describe('enzyme smoke tests', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<GeneralTable 
      {...userTableProps} />);
  });

  afterAll(() => {
    unmount(wrapper);
  });
  it('matches napshot', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  
  it('actually have a single table element', () => {
    expect(wrapper.find('table').length).toBe(1);
  });
});

// Integration testing - testing library
describe('the initial test user data', () => {
it('should display a the test user in table row', () => {
    const { container, getByText } = render(<GeneralTable {...userTableProps} />);

    const tableNode = container.querySelector('table');
    expect(tableNode).toBeInTheDocument();

    const tdNode = getByText(testUser[0].name);
    expect(tdNode.textContent).toBe('Ervin Howell');
  });

  it('should display the user table configuration columns', () => {
    const { container, getByText } = render(<GeneralTable {...userTableProps} />);

    const headerNode = container.querySelector('thead');
    expect(headerNode).toBeInTheDocument();
   
    // user table config specifies column headers, see if these
    // are rendered
    UserTableConfig.headers.forEach((value, key) => {
      const tdNode = getByText(value['display']);
      expect(tdNode.textContent).toBe(UserTableConfig.headers[key].display);
    });
  });
  
  it('should display the post table configuration columns', () => {
    const { container, getByText } = render(<GeneralTable {...postTableProps} />);

    const headerNode = container.querySelector('thead');
    expect(headerNode).toBeInTheDocument();
   
    // user table config specifies column headers, see if these
    // are rendered
    PostTableConfig.headers.forEach((value, key) => {
      const tdNode = getByText(value['display']);
      expect(tdNode.textContent).toBe(PostTableConfig.headers[key].display);
    });
  });

  it('should display the correct number of users', () => {
    const { container } = render(<GeneralTable {...userTableProps} />);
    const captionNode = container.querySelector('.caption');
    expect(captionNode).toBeInTheDocument();

    const lengthStr = testUser.length.toString();
    expect(captionNode.textContent.includes(lengthStr)).toBeTruthy();
  });

  it('should display the correct number of posts', () => {
    const { container } = render(<GeneralTable {...postTableProps} />);
    const captionNode = container.querySelector('.caption');
    expect(captionNode).toBeInTheDocument();

    const lengthStr = testPost.length.toString();
    expect(captionNode.textContent.includes(lengthStr)).toBeTruthy();
  });
});

describe('The user table\'s row click', () => {
  it('calls correct function from parent component', async () => {
    const { container } = render(<GeneralTable {...userTableProps} />);

    const tableRow = container.querySelector('tbody tr');
    fireEvent.click(tableRow);
    await expect(historyMock).toHaveBeenCalled();
  });
});
