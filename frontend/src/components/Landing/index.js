import React from 'react';

import SignInButton from './signin-button';
import Card from 'react-bootstrap/Card';

/**
 * Landing component that defines the first page the user encounters in the
 * application.
 */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>Welcome to SLURP</Card.Title>
            {/* TODO (Issue #24): Put path to logo when we have one. */}
            <img alt='SLURP Logo'></img>
          </Card.Body>
          <SignInButton />
        </Card>
      </div>
    );
  }
};

export default Landing;
