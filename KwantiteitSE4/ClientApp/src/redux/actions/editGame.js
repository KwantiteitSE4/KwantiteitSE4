import axios from 'axios';

export function postEditGame (gameId, player1New, player2New) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Games/EditPlayers', {
      gameId,
      player1New,
      player2New
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }
}
export function postEditGameDateTime (game, newDateTime) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Games/Edit', {
      gameID: game.gameID,
      player1ID: game.player1ID,
      player2ID: game.player2ID,
      winnerID: game.winnerID,
      numberOfSets: game.numberOfSets,
      numberOfLegs: game.numberOfLegs,
      gameDateTime: newDateTime
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }
}
