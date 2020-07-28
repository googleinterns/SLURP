import React from 'react';
import UserInfo from './UserInfo.js';

import '../../styles/header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { VIEW_TRIPS } from '../../constants/routes.js';

/**
 * Header component to display at the top of pages. By default, it displays the
 * SLURP logo on the left and user info on the right. It accepts a React
 * component, rendering whatever it was given in the middle of the header.
 *
 * This component must ONLY be called in PrivateRoute pages.
 *
 * @param {Object} props An optional React component can be passed as the child
 * of this component. The Header component will then render the given child
 * component in its center.
 */
class Header extends React.Component {
  /** @inheritdoc */
  render() {
    return (
      <div>
        <Navbar className='d-flex align-items-center' sticky='top' bg='info'>
          <Navbar.Brand href={VIEW_TRIPS}>
            {/* TODO (Issue #24): Put path to logo when we have one. */}
            <img alt="SLURP Logo" />
          </Navbar.Brand>
          <Container>
            {this.props.children}
          </Container>
          <UserInfo />
        </Navbar>
      </div>
    );
  }
};

export default Header;
