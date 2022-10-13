import * as type from '../types';
import axios from 'axios';

export function postScore(score) {
  return function(dispatch) {
    return dispatch(setCurrentScore(score));
  }
}

export const setCurrentScore = (scores) => {
  return {
    type: type.SET_SCORE,
    score: scores
  }
}
