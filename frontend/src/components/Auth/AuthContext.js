import React, { useState, useEffect } from 'react';
import app from '../Firebase';

const AuthContext = React.createContext();

/**
 * AuthProvider component that keeps track of the authentication status of the
 * current user. Allows global use of this status using React Context and should
 * be wrapped around the contents of the App component.
 */
const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return ( <h1>Loading...</h1> );
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
