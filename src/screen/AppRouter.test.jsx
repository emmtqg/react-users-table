import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reduxThunkReducer from '../reducers/reducer';

import { render } from "@testing-library/react";

import { testUser } from "../utils/testUser";
import { Routes } from "./App";

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
  return render(<Provider store={store}>
    <Router initialEntries={initialEntries}>{children}</Router></Provider>);
};

describe("App router for User/Post pages", () => {
  it("render Users at '/'", () => {
    const route = ["/"];
    const page = renderWithRouter(<Routes />, route);
    page.getByText("Users");
  });

  it("should render Posts at '/posts/:userId", () => {
    const user = testUser[0];
    const route = [`/posts/${user.id}`];
    const page = renderWithRouter(<Routes />, route);
    page.getByText("Posts");
  });

  test('landing on a bad page shows 404 page', () => {
    const badRoute = '/some/bad/route';
    const page = renderWithRouter(<Routes />, [badRoute]);
    var regex = new RegExp(badRoute, "i");
    page.queryByAltText(regex);
  });
});
