import React from 'react';

const HeaderJumbo = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Searchable React Configurable Table</h1>

      <p className="lead"></p>
      <hr className="my-4" />
      <p>Searchable React Table with detail page (lists user's posts).</p>

      <p className="lead">This amazing react table:</p>
      <ul>
        <li>Features a single presentational component to display variable json data</li>
        <li>Fully configurable with an external json file to define json fields displayed, display names for fields, column widths, text alignment, title definition</li>
        <li>Uses redux and thunk to facilitate asynchronous data fetching from configurable api endpoints</li>
        <li>Uses Bootstrap 4 and most modules are implemented with typescript</li>
        <li>Based from the create-react-app with typescript</li>
        <li>Features a case-sensitivity mode checkbox to enable/disable case sensitive searches using  lodash for speed and efficiency</li>
      </ul>
    </div>
  );
};

export default HeaderJumbo;
