import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';

import reduxThunkReducer from '../reducers/reducer';
import './App.css';
import UserTableWrapper from './UsersTableWrapper';
import PostsTableWrapper from './PostsTableWrapper';
import HeaderJumbo from '../screen/HeaderJumbo';
import Footer from '../screen/Footer';

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

// Router
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <HeaderJumbo />
          <Route exact path="/" component={UserTableWrapper} />        
          <Route path="/posts/:userId" component={PostsTableWrapper} />
          <hr />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
