import { createAsyncThunk } from '@reduxjs/toolkit';
import * as type from '../types';
import axios from 'axios';

export function fetchAllGames () {
  return function(dispatch) {
    return axios.get(axios.defaults.baseURL + '/Games').then(response => {
      dispatch(fetchGames(response.data))
      console.log(response.data)
    })
      .catch(error => {
        throw (error);
      })
  }
}

export const fetchGames = (games) => {
  return {
    type: type.GET_GAMES,
    payload: games
  }
}
