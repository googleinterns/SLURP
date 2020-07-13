import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import LandingPage from '../Landing';
import SignInPage from '../SignIn'
import ViewActivitiesPage from '../ViewActivities';
import ViewTripsPage from '../ViewTrips';
import * as ROUTES from '../../constants/routes';

/**
 * The main App component that is fed to the index.js entrypoint. Defines all
 * pages that can be visited using React Router.
 */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.VIEW_TRIPS} component={ViewTripsPage} />
          <Route path={ROUTES.VIEW_ACTIVITIES + "/:tripId"} component={ViewActivitiesPage} />
        </div>
      </Router>
    );
  }
};

export default App;
