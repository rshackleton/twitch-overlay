import { combineEpics } from 'redux-observable';
import donationsEpic from './donations';
import eventsEpic from './events';

export default combineEpics(donationsEpic, eventsEpic);
