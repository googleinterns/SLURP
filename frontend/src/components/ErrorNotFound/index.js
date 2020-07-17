import React from 'react';
import LandingButton from './LandingButton.js';

class ErrorNotFound extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <h1>Error 404 Page Not Found</h1>
        <p>Oops, looks like the page you were looking for doesn't exist.</p>
        <LandingButton />
      </div>
    );
  }
};

export default ErrorNotFound;
