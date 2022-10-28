import * as type from '../types';
import axios from 'axios';

export function fetchCurrentGame (gameID) {
  return function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Games/Details/' + gameID).then(response => {
      //console.log(response.data)
      dispatch(fetchGame(response.data))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const fetchGame = (match) => {
  return {
    type: type.GET_CURRENT_GAME,
    payload: match
  }
}
