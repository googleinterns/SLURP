import React from 'react';
import app from '../Firebase';

const AuthContext = React.createContext();

/**
 * AuthProvider component that keeps track of the authentication status of the
 * current user. Allows global use of this status using React Context and should
 * be wrapped around the contents of the App component.
 */
class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null};
  }

  componentDidMount() {
    // Set up listener that runs whenever the authentication status of the user
    // changes.
    app.auth().onAuthStateChanged((user) => {
      this.state.currentUser = user;
    })
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.currentUser}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };
