import * as type from '../types';

export const setCurrentPlayer = (players) => {
  return {
    type: type.SET_PLAYER,
    player: players
  }
}
