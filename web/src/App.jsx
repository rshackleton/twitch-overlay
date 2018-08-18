import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Home from './routes/Home';
import DonationsGoal from './routes/DonationsGoal';
import DonationsNotifications from './routes/DonationsNotifications';

import history from './core/history';
import store from './core/store';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/goal" component={DonationsGoal} />
        <Route path="/notifications" component={DonationsNotifications} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
