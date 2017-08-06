import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import rootEpic from 'epics';
import { scrollMiddleware } from 'middleware';
import rootReducer from 'reducers';

import history from './history';

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger({ collapsed: true }),
    createEpicMiddleware(rootEpic),
    routerMiddleware(history),
    scrollMiddleware,
  ),
);

export default store;
