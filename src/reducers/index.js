import { combineReducers } from 'redux';
import ProfileReducer from './ProfileReducer';
import TimelineHomeReducer from './TimelineHomeReducer';
import TimelinePublicReducer from './TimelinePublicReducer';

export default combineReducers({
  profile: ProfileReducer,
  timelineHome: TimelineHomeReducer,
  timelinePublic: TimelinePublicReducer
});
