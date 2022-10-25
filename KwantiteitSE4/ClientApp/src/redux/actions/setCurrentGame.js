import * as type from '../types';
import axios from 'axios';

export function updateGame(currentGame, currentSet, currentLeg) {
  return async function (dispatch) {
    return axios.post('https://localhost:44308/Legs/Edit', {
      currentLeg
    }).then(response => {
      return axios.post('https://localhost:44308/Sets/Edit', {
        currentSet
      }).then(response => {
        return axios.post('https://localhost:44308/Games/Edit', {
          currentGame
        }).then(async response => {
          await dispatch(fetchGame(response.data))
        }).catch(error => {
          throw (error);
        });
      }).catch(error => {
        throw (error);
      });
    }).catch(error => {
      throw (error);
    });
  }
}

export const fetchGame = (match) => {
  return {
    type: type.GET_CURRENT_GAME,
    payload: match
  }
}

export const setCurrentMatchTrue = () => {
  return {
    type: type.CURRENT_GAME_SET,
    payload: true
  }
}
