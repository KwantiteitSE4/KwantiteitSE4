import * as type from '../types';

export function getScore(score) {
  return function (dispatch) {
    return dispatch(getCurrentScore(score));
  };
}

export const getCurrentScore = (score) => {
  return {
    type: type.GET_SCORE,
    payload: score
  }
}
