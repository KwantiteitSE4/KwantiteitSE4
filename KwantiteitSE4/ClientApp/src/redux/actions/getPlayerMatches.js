import * as type from '../types';
import axios from 'axios';

export function fetchPlayerGames (player) {
  return function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Players/Games/' + player).then(response => {
      dispatch(fetchGames(response.data))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const fetchGames = (matches) => {
  return {
    type: type.GET_PLAYER_MATCHES,
    payload: matches
  }
}
