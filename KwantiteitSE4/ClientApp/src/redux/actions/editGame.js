import axios from 'axios';

export function postEditGame (newGame) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Games/Edit', {
      newGame
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }
}
