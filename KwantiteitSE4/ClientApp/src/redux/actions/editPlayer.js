import axios from 'axios';
import * as type from '../types';

export function postEditPlayer (playerID, name, country, matchesWon) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Players/Edit', {
      playerID,
      name,
      country
    }).then(response => {
      dispatch(setCurrentPlayer(playerID, name, country, matchesWon))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const setCurrentPlayer = (playerID, name, country, matchesWon) => {
  return {
    type: type.EDIT_NAME_CURRENT,
    current: { playerID, name, country, matchesWon }
  }
}
