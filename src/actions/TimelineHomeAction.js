import { ACTION_TIMELINE_HOME_SUCCESS, ACTION_TIMELINE_HOME_FAIL, ACTION_TIMELINE_HOME } from './types';
import { apis } from '../components/common';
import { MostodonService } from '../services';


export const actionTimelineHome = (payload) => {
  return (dispatch) => {
    MostodonService.v1_timeline_home(payload.path)
    .then((responseJson) => {
      dispatch({type: ACTION_TIMELINE_HOME_SUCCESS, payload: responseJson})
    })
    .catch ((error) => {
      dispatch(ACTION_TIMELINE_HOME_FAIL);
    });
  }
}
