import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter, MemoryRouter} from 'react-router'

import { createMemoryHistory } from 'history'

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reduxThunkReducer from '../reducers/reducer';

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForDomChange } from '@testing-library/react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

import UserTableWrapper from './UsersTableWrapper';
import PostsTableWrapper from './PostsTableWrapper';

import UserTableConfig from '../config/Users.json';
import PostTableConfig from '../config/Posts.json';
import testUser from '../utils/TestUser.json';
import testPost from '../utils/TestPost.json';

// Loading/Search icons icon
library.add(faSpinner, faSearch);

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

const UserPageStub = () => (<div><h1>{UserTableConfig.title}</h1></div>);

const PostPageStub = () => (<div><h1>{PostTableConfig.title}</h1></div>);

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
))

// TODO: Research Route outside of Router error
const renderWithRouter = (children, route="/") => {
  const history = createMemoryHistory(route);
  return render(<Router history={history}>{children}</Router>)
}

const App = () => {
  return (
        <div className="App">
          <Route exact path="/" component={UserPageStub} />        
          <Route path="/posts/2" component={PostPageStub} />
        </div>
    );
}

describe('App router for User/Post pages', () => {

  xit('base url should default to the user page ', () => {
    const route = ["/"];
    const { container } = renderWithRouter(<App />, route);
      
    // verify page content for expected route
    // often you'd use a data-testid or role query, but this is also possible
    expect(container.innerHTML).toMatch('Users');
  });

  xit('should route to Post of user when url updates', () => {
    const user = testUser[0].id;
    const route = [`/posts/${user}`];
    const { container } = renderWithRouter(<App />, route); 
    // check that the content changed to the new page
    expect(container.innerHTML).toContain(testPost[0].title);
  });
  
  xit('should should render the Post page for the selected user', () => {
    const { container } = renderWithRoute('/');
  
    // verify page content for user row click
    const titleNode = container.querySelector('h1');
    expect(titleNode.textContent.includes(UserTableConfig.title)).toBeTruthy();

  });
});
