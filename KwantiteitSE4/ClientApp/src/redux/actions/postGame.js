import axios from 'axios';
import { fetchCurrentGame } from './getCurrentGame';

export function postNewGame (values) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Games/Create', {
      gameDateTime: values.gameDateTime,
      numberOfLegs: values.numberOfLegs,
      numberOfSets: values.numberOfSets,
      player1ID: values.player1ID,
      player2ID: values.player2ID
    }).then(async response => {
      console.log(response)
      await dispatch(postNewSet(response.data, values.startPlayerID));
      dispatch(fetchCurrentGame(response.data));
    })
      .catch(error => {
        throw (error);
      })
  }
}

export function postNewSet (gameID, startPlayerID) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Sets/Create', {
      gameID
    }).then(response => {
      console.log(response)
      dispatch(postNewLeg(response.data, startPlayerID))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export function postNewLeg (setID, startPlayerID) {
  return function(dispatch) {
    return axios.post(axios.defaults.baseURL + '/Legs/Create', {
      setID, startPlayerID
    }).then(response => {
      console.log(response)
      dispatch(postNewTurn(response.data, startPlayerID, '501'))
    })
      .catch(error => {
        throw (error);
      })
  }
}

export function postNewTurn(legID, startPlayerID, endScore) {
  return function (dispatch) {
    return axios.post(axios.defaults.baseURL + '/Turns/Create', {
      legID, playerID: startPlayerID, endScore
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }
}
