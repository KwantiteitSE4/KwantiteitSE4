import * as type from '../types';
import axios from 'axios';

// Creates a new set in the database and uses the returned setID to create a new leg
export function postNewSet(gameID, startPlayerID) {
  return function (dispatch) {
    return axios.post('https://localhost:44308/Sets/Create', {
      gameID
    }).then(response => {
      // console.log(response);
      dispatch(postNewLeg(response.data, startPlayerID));
    }).catch(error => {
      throw (error);
    })
  }
}
// Creates a new leg in the database and uses the returned legID to create a new turn
export function postNewLeg(setID, startPlayerID) {
  return function (dispatch) {
    return axios.post('https://localhost:44308/Legs/Create', {
      setID, startPlayerID
    }).then(response => {
      // console.log(response);
      dispatch(postNewTurn(response.data, startPlayerID, 501))
    }).catch(error => {
      throw (error);
    })
  }
}
// Creates a new turn in the database.
export function postNewTurn(legID, playerID, endScore) {
  console.log('LEG ID');
  console.log(legID);
  return function (dispatch) {
    return axios.post('https://localhost:44308/Turns/Create', {
      legID, playerID, endScore
    }).then(response => {
      // console.log(response);
    }).catch(error => {
      throw (error);
    })
  }
}
// Edits the current turn to update its endscore in the database
export function editCurrentTurn(turn, endScore) {
  turn.endScore = endScore;
  return function (dispatch) {
    return axios.post('https://localhost:44308/Turns/Edit', {
      turnID: turn.turnID,
      legID: turn.legID,
      playerID: turn.playerID,
      endScore: turn.endScore
    }).then(response => {
      // console.log(response);
    }).catch(error => {
      throw (error);
    })
  }
}

// post een nieuwe throw naar de database, bestaande uit een turnID, een multiplier (single, double, triple) het vak van de pijl
export function postNewThrow(turnID, multiplier, singleThrowScore) {
  console.log(singleThrowScore);
  return function (dispatch) {
    return axios.post('https://localhost:44308/Throws/Create', {
      turnID: turnID,
      multiplier: multiplier,
      throwScore: singleThrowScore
    }).then(response => {
      console.log(response);
    }).catch(error => {
      throw (error);
    })
  }
}
