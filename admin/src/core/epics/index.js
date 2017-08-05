import 'rxjs';
import { combineEpics } from 'redux-observable';
import donationsEpic from './donations';

export default combineEpics(
  donationsEpic,
);
