import axios from 'axios';
import * as type from '../types';

export function postEditPlayer (playerID, name, country) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Players/Edit', {
      playerID,
      name,
      country
    }).then(response => {
      dispatch(setCurrentPlayer(playerID, name))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const setCurrentPlayer = (playerID, name, country) => {
  return {
    type: type.EDIT_NAME_CURRENT,
    current: { playerID, name, country }
  }
}
