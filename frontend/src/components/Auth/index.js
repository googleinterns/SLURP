import React, { useState, useEffect } from 'react';
import app from '../Firebase';

const AuthContext = React.createContext();

/**
 * AuthProvider component that keeps track of the authentication status of the
 * current user. Allows global use of this status using React Context and should
 * be wrapped around the contents of the App component.
 */
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
      </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
