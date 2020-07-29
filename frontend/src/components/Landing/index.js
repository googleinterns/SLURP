import React from 'react';

import SignInButton from './signin-button.js';
import Jumbotron from 'react-bootstrap/Jumbotron';

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
      <div className='hero-image'>
        <Jumbotron>
          <h1 id='title'>SLURP</h1>
          <h2 id='subtitle'>(Shared Live Universal Recreation Planner)</h2>
          <p id='landing-description'>
            With SLURP, you can collaborate with others on your upcoming trips
            using our intuitive, real-time itinerary planner.
          </p>
          <div id='logo-and-button'>
            <img src={logo}
                 alt='SLURP Logo'
                 id='logo-landing'
            />
            <SignInButton />
          </div>
        </Jumbotron>
      </div>
    );
  }
};

export default Landing;
