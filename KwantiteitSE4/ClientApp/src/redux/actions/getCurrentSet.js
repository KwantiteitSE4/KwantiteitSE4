import * as type from '../types';
import axios from 'axios';

export function fetchCurrentSet (setID) {
  return function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Sets/Details/' + setID).then(response => {
      dispatch(fetchSet(response.data))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const fetchSet = (set) => {
  return {
    type: type.GET_CURRENT_SET,
    payload: set
  }
}
