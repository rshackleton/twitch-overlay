import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import routes from 'routes';

import history from './core/history';
import store from './core/store';
import { DonationStream } from './components';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <DonationStream>
        <div>
          {routes.map(route => (
            <Route {...route} />
          ))}
        </div>
      </DonationStream>
    </ConnectedRouter>
  </Provider>
);

export default App;
