import * as type from '../types';
import axios from 'axios';

export function fetchPlayerGames (player) {
  return async function(dispatch) {
    return await axios.get(axios.defaults.baseURL + '/Players/games/' + player).then(response => {
      dispatch(fetchGames(response.data))
      console.log(response.data)
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
