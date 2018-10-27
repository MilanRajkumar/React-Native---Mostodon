import { ACTION_TIMELINE_HOME_SUCCESS, ACTION_TIMELINE_HOME_FAIL } from '../actions/types';
import { pick } from 'lodash';

const reqKeys  = [
        "id",
        "in_reply_to_id",
        "in_reply_to_account_id",
        "sensitive",
        "visibility",
        "account",
        "uri",
        "content",
        "reblogs_count",
        "favourites_count",
        "reblog",
        "favourited",
        "reblogged"
    ]

export default ( state = null, action ) => {
  switch (action.type) {
    case ACTION_TIMELINE_HOME_SUCCESS:
		let payload = action.payload
		let finalArraysOfObject = payload.map((data) => {
			return pick(data, reqKeys);
		})
		return finalArraysOfObject;
		case ACTION_TIMELINE_HOME_FAIL:
      return state;
    default:
      return state;
  }
}
