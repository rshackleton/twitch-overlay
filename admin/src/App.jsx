import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { withRoot, Navigation } from 'components';
import routes from 'routes';

import history from './core/history';
import store from './core/store';

const styles = theme => ({
  root: {
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
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

const StyledApp = withStyles(styles)(App);
export default withRoot(StyledApp);
