import * as type from '../types';
import axios from 'axios';

export const setCurrentPlayer = (players) => {
  return {
    type: type.SET_PLAYER,
    player: players
  }
}
