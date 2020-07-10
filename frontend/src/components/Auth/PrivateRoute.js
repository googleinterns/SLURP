import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

import { SIGN_IN } from '../../constants/routes.js';

/**
 * PrivateRoute component that takes the authentication status of the current
 * user from AuthContext. If they are authenticated, they will be allowed to
 * view the contents of the Route component. If they are not authenticated, they
 * will be redirected to the SIGN_IN page.
 */
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? <RouteComponent {...routeProps} />
                    : <Redirect to={SIGN_IN} />
      }
    />
  );
}

export default PrivateRoute;
