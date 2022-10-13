import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as type from '../types';

const initialState = {
  value: [],
  currentPlayer: []
}

function playerReducer (state = initialState, action) {
  switch (action.type) {
    case type.GET_PLAYERS:
      return {
        ...state,
        value: action.payload
      }
    case type.SET_PLAYER:
      return {
        ...state,
        currentPlayer: action.player
      }
    case type.EDIT_NAME_CURRENT:
      return {
        ...state,
        currentPlayer: action.current
      }
    default:
      return state;
  }
}

export default playerReducer;
