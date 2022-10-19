import * as type from '../types';
import axios from 'axios';

export function fetchCurrentGame (gameID) {
  return async function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Games/Details/' + gameID).then(async response => {
      await dispatch(fetchGame(response.data))
      console.log(response.data)
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

// export const fetchCurrentGame = (match) => {
//     return {
//         type: type.GET_CURRENT_GAME,
//         payload: match
//     }
// }
