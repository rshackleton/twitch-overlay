import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from './routes/Home';
import OverlayBackground from './routes/OverlayBackground';
import Goal from './routes/donations/Goal';
import Latest from './routes/donations/Latest';
import Top from './routes/donations/Top';

import history from './core/history';
import store from './core/store';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/overlay-background" component={OverlayBackground} />
        <Route path="/goal" component={Goal} />
        <Route path="/latest" component={Latest} />
        <Route path="/top" component={Top} />
        <Redirect to="/" />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
