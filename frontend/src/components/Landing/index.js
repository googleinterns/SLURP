import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { SIGN_IN } from '../../constants/routes';

/**
 * Landing component that defines the first page the user encounters in the
 * application.
 */
class Landing extends React.Component {
  goToSignIn() {
    useHistory().push(SIGN_IN);
  }

  render() {
    return (
      <div>
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>Welcome to SLURP</Card.Title>
            {/* TODO (Issue #24): Put path to logo when we have one. */}
            <img alt='SLURP Logo'></img>
          </Card.Body>
          <Button type='button' onClick={goToSignIn} variant='primary' size='lg'>
            Sign In
          </Button>
        </Card>
      </div>
    );
  }
};

export default Landing;
