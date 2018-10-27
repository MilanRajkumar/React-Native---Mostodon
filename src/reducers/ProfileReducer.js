import { USER_PROFILE_SUCCESS, USER_PROFILE_FAIL } from '../actions/types';

const INITIAL_STATE = {
		id: '',
		username: '',
		acct: null,
		display_name: '',
		locked: false,
		created_at: '',
		note: '',
		url: '',
		avatar: '../assets/image/default.png',
		header: '',
		followers_count: 0,
		following_count: 0,
		statuses_count: 0
	};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
	  	let newState = Object.assign({}, state, action.payload)
      return newState;
    default:
      return state;
  }
}
