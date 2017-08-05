import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import PropTypes from 'prop-types';

import {
  createStyleSheet,
  withStyles,
} from 'material-ui/styles';

import withRoot from '../../components/withRoot';
import Donations from '../Donations';
import Home from '../Home';
import Navigation from '../../components/Navigation';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  applyMiddleware(middleware),
);

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

const styleSheet = createStyleSheet({
  root: {
    marginTop: 56,
  },
});

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
