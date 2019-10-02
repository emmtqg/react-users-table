import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Using testing-library/react (replacing enzyme,
// primarily focus of lib is integration testing)
import '@testing-library/jest-dom/extend-expect'

// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required
import {render} from '@testing-library/react'

import HeaderJumbo from '../screen/HeaderJumbo';
import Footer from '../screen/Footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('the basic page elements', () => {
  it('should include a jumbotron', () => {
    const { container } = render(<HeaderJumbo />);

    const tableNode = container.querySelector('.jumbotron');
    expect(tableNode).toBeInTheDocument();
  });

  it('should include a footer', () => {
    const { container } = render(<Footer />);

    const footerNode = container.querySelector('footer');
    expect(footerNode).toBeInTheDocument();
  });
});

