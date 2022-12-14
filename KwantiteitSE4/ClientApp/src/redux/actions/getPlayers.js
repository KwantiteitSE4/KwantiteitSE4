import * as type from '../types';
import axios from 'axios';

export function fetchAllPlayers () {
  return function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Players').then(response => {
      dispatch(fetchPlayers(response.data))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const fetchPlayers = (players) => {
  return {
    type: type.GET_PLAYERS,
    payload: players
  }
}
