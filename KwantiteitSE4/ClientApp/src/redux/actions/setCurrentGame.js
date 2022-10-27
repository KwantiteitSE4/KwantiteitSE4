import * as type from '../types';
import axios from 'axios';
// Updates the currently played leg, set and game itself
export function updateGame(currentGame, currentSet, currentLeg) {
  return async function (dispatch) {
    return axios.post('https://localhost:44308/Legs/Edit', {
      legID: currentLeg.legID,
      setID: currentLeg.setID,
      startPlayerID: currentLeg.startPlayerID,
      winnerID: currentLeg.winnerID
    }).then(response => {
      return axios.post('https://localhost:44308/Sets/Edit', {
        setID: currentSet.setID,
        gameID: currentSet.gameID,
        winnerID: currentSet.winnerID
      }).then(response => {
        return axios.post('https://localhost:44308/Games/Edit', {
          gameID: currentGame.gameID,
          player1ID: currentGame.player1ID,
          player2ID: currentGame.player2ID,
          winnerID: currentGame.winnerID,
          numberOfSets: currentGame.numberOfSets,
          numberOfLegs: currentGame.numberOfLegs,
          gameDateTime: currentGame.gameDateTime
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
