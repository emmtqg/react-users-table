import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UserTableWrapper from './screen/UsersTableWrapper';
import PostTableWrapper from './screen/PostsTableWrapper';

export default (
  <Route path="/" component={App}>
     <IndexRoute component={UserTableWrapper} />
     <Route path="Users" component={UserTableWrapper} />
     <Route path="Posts" component={PostTableWrapper} />
  </Route>
);