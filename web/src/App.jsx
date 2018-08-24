import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from './routes/Home';
import Goal from './routes/donations/Goal';
import Latest from './routes/donations/Latest';
import Top from './routes/donations/Top';

import history from './core/history';
import store from './core/store';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/goal" component={Goal} />
        <Route path="/latest" component={Latest} />
        <Route path="/top" component={Top} />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
