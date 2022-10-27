import * as type from '../types';

export const setEndScore = (games) => {
  return {
    type: type.SET_END_SCORE,
    games
  }
}
