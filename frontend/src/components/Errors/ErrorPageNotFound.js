import React from 'react';
import GoToLandingButton from './GoToLandingButton.js';

/**
 * Error component displayed when the user attempts to navigate to a page of the
 * website that does not exist.
 */
class ErrorPageNotFound extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <h1>Error 404 Page Not Found</h1>
        <p>Oops, looks like the page you were looking for doesn't exist.</p>
        <GoToLandingButton />
      </div>
    );
  }
};

export default ErrorPageNotFound;
