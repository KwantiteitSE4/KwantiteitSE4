import * as type from '../types';

export const setCurrentPlayer = (player) => {
  return {
    type: type.SET_PLAYER,
    player
  }
}
