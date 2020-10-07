/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
// import HomePage from './containers/HomePage';
import InquiryPage from './containers/InquiryPage';
import OfferingPage from './containers/OfferingPage';
import PositionPage from './containers/PositionPage';
import NoMatch from './containers/NoMatch';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.OFFERING} component={OfferingPage} />
        <Route path={routes.POSITION} component={PositionPage} />
        <Route path={routes.HOME} component={InquiryPage} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </App>
  );
}
