import React from 'react';

const Error404 = ({ location }) => {
  const errorMsg = `Error page: ${location.pathname} not found.`;
  return (
    <div className="error-page absolute-center">
      <h2>{errorMsg}</h2>
      <img src="./404.jfif" alt={errorMsg} />
    </div>
  );
}

export default Error404;