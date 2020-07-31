import React from 'react';

import SignInButton from './signin-button.js';
import Card from 'react-bootstrap/Card';

import logo from '../../images/logo.png';
import '../../styles/landing.css';

/**
 * Landing component that defines the first page the user encounters in the
 * application.
 */
class Landing extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>Welcome to SLURP</Card.Title>
            <img src={logo}
                 alt='SLURP Logo'
                 id='logo-landing'
            />
          </Card.Body>
          <SignInButton />
        </Card>
      </div>
    );
  }
};

export default Landing;
