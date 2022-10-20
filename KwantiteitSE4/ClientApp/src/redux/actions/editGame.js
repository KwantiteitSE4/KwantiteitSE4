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
