import axios from 'axios'
import { fetchAllPlayers } from './getPlayers'

export function postNewPlayer (values) {
  return function(dispatch) {
    axios.post(axios.defaults.baseURL + '/Players/Create', {
      name: values.name, country: values.country
    }).then(response => {
      console.log(response)
      dispatch(fetchAllPlayers());
    })
      .catch(error => {
        throw (error);
      })
  }
}
