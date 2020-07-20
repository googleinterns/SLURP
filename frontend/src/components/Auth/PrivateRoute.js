import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

import { SIGN_IN } from '../../constants/routes.js';

/**
 * PrivateRoute component that functions similarly to the `Route` component,
 * with the added check that determines if the user is currently signed in.
 *
 * This component takes the authentication status of the current user from
 * AuthContext. If they are authenticated, they will be allowed to view the
 * contents of the Route component. If they are not authenticated, they will be
 * redirected to the SIGN_IN page.
 *
 * @param {Object} props The following props are expected:
 * - component {React.Component} The component that `PrivateRoute` should render
 * if the user is currently authenticated.
 */
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useContext(AuthContext);

  // The rest of the props passed into `PrivateRoute` are given as props to the
  // `Route` component as normal. The render prop is used to specify that, if
  // the user is signed in, the given component to render should be rendered
  // along with all the standard Route paths (URL path, etc.), and if the user
  // is not signed in, a `Redirect` prop should be rendered instead.
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
