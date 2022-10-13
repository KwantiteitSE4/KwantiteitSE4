import axios from 'axios';
import * as type from '../types';

export function postEditPlayer (playerID, name) {
  return function(dispatch) {
    return axios.post('https://localhost:5001/Players/Edit', {
      playerID,
      name
    }).then(response => {
      dispatch(setCurrentPlayer(playerID, name))
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const setCurrentPlayer = (playerID, name) => {
  return {
    type: type.EDIT_NAME_CURRENT,
    current: { playerID, name }
  }
}
