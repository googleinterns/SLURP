import React, { useContext } from 'react';
import { AuthContext } from '../Auth';

let currentUser;

/**
 * TODO: document!
 */
export const AuthUtilsConsumer = (props) => {
  currentUser = useContext(AuthContext);
  return (
    <div>{props.children}</div>
  );
};

export function getCurrentUser() {
  return currentUser;
}
