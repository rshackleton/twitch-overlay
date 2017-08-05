import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';

import { Donations, Home } from 'routes';
import { withRoot, Navigation } from 'components';

import history from './core/history';
import store from './core/store';

const routes = [{
  key: 'root.home',
  path: '/',
  exact: true,
  component: Home,
  title: 'Home',
}, {
  key: 'root.donations',
  path: '/donations',
  component: Donations,
  title: 'Donations',
}];

const styleSheet = createStyleSheet(theme => ({
  root: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
}));

const App = ({ classes }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className={classes.root}>
        <Navigation routes={routes} />
        <div>
          {routes.map(route => <Route {...route} />)}
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledApp = withStyles(styleSheet)(App);
export default withRoot(StyledApp);
