import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import rootEpic from 'epics';
import { scrollMiddleware } from 'middleware';
import rootReducer from 'reducers';

import history from './history';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(
    createLogger({ collapsed: true }),
    epicMiddleware,
    routerMiddleware(history),
    scrollMiddleware,
  ),
);

epicMiddleware.run(rootEpic);

export default store;
