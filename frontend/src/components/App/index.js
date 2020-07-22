import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LandingPage from '../Landing';
import SignInPage from '../SignIn'
import ViewActivitiesPage from '../ViewActivities';
import ViewTripsPage from '../ViewTrips';
import { ErrorPageNotFound } from '../Errors';
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
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.VIEW_TRIPS} component={ViewTripsPage} />
            <Route path={ROUTES.VIEW_ACTIVITIES + '/:tripId'} component={ViewActivitiesPage} />
            {/* The ErrorNotFound component MUST be at the bottom of the Router! */}
            <Route component={ErrorPageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
