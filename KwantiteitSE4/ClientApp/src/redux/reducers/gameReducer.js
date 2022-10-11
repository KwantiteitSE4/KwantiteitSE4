import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as type from '../types';

const initialState = {
  value: [],
  currentGame: [],
  currentSet: [],
  gameLoader: false,
}

function gameReducer (state = initialState, action) {
  switch (action.type) {
    case type.GET_GAMES:
      return {
        ...state,
        value: action.payload
      }
    case type.GET_CURRENT_GAME:
      return{
        ...state,
        currentGame: action.payload,
      }
    case type.CURRENT_GAME_SET:
      return{
        ...state,
        gameLoader: action.payload
      }
    case type.GET_CURRENT_SET:
      return{
        ...state,
        currentSet: action.payload
      }
    default:
      return state;
  }
}

export default gameReducer;
