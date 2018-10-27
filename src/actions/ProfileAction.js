import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  ACTION_USER_PROFILE,
  ACTION_ACCOUNTS_SEARCH,
  ACTION_ACCOUNTS_SEARCH_SUCCESS,
  ACTION_ACCOUNTS_SEARCH_FAIL
} from './types';
import { apis } from '../components/common';
import { MostodonService } from '../services';

const profileSuccess  = (dispatch, data) => {
  dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
}

const loginUserFail = (dispatch) => {
  dispatch(USER_PROFILE_FAIL);
}

export const actionUserProfile = (payload) => {
  let self = this
  return (dispatch) => {
  	dispatch({ type: ACTION_USER_PROFILE })
    MostodonService.v1_current_user(payload.path)
    .then((responseJson) => {
      profileSuccess(dispatch, responseJson)
    })
    .catch ((error) => {
      // loginUserFail(dispatch)
      console.log(error)
    });
  }
}

export const actionAccountsSearch = (payload) => {
  return (dispatch) => {
      dispatch({ type: ACTION_ACCOUNTS_SEARCH })
    MostodonService.v1_accounts_search(payload.path + payload.queryParam)
    .then((response) => {
      dispatch({ type: USER_PROFILE_SUCCESS, payload: response });
    })
    .catch ((error) => {
      console.log(error)
      dispatch({ type: ACTION_ACCOUNTS_SEARCH_FAIL, payload: error });
    });
  }
}
