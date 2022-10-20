import * as type from '../types';
import axios from 'axios';

export function fetchPlayerGames (player) {
  return async function(dispatch) {
    return await axios.get(axios.defaults.baseURL + '/Players/Games/' + player).then(async response => {
      await dispatch(fetchGames(response.data))
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
