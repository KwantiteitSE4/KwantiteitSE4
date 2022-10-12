import { createAsyncThunk } from '@reduxjs/toolkit';
import * as type from '../types';
import axios from 'axios';

export function fetchAllPlayers () {
  return async function(dispatch) {
      return await axios.get('https://localhost:44308/Players').then(response => {
      dispatch(fetchPlayers(response.data))
      console.log(response.data)
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
