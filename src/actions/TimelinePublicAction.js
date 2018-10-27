import { ACTION_TIMELINE_PUBLIC_SUCCESS, ACTION_TIMELINE_PUBLIC_FAIL, ACTION_TIMELINE_PUBLIC } from './types';
import { apis } from '../components/common';
import { MostodonService } from '../services';


export const actionTimelinePublic = (payload) => {
  return (dispatch) => {
    MostodonService.v1_timeline_public(payload.path)
    .then((responseJson) => {
      dispatch({type: ACTION_TIMELINE_PUBLIC_SUCCESS, payload: responseJson})
    })
    .catch ((error) => {
      dispatch(ACTION_TIMELINE_PUBLIC_FAIL);
    });
  }
}
