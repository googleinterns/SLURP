import React, { useContext } from 'react';
import { AuthContext } from '../Auth';

let currentUser;

/**
 * React Context Consumer component that only gets the value of the current
 * authenticated user as given by the AuthProvider component. Intended to be
 * wrapped around the App component's Router component as a child of the
 * AuthProvider component.
 *
 * @param {Object} props No arguments are expected for this component's props.
 * The child components are simply passed through.
 */
export const AuthUtilsConsumer = (props) => {
  currentUser = useContext(AuthContext);
  return (
    <div>{props.children}</div>
  );
};

/**
 * Returns the current authenticated user set by the AuthUtilsConsumer
 * component.
 *
 * @returns {firebase.User} The currently authenticated user.
 */
export function getCurrentUser() {
  return currentUser;
}
