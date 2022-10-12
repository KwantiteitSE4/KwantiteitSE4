import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as type from '../types';

const initialState = {
  value: []
}

function playerReducer (state = initialState, action) {
  switch (action.type) {
    case type.GET_PLAYERS:
      return {
        value: action.payload
      }
    default:
      return state;
  }
}

export default playerReducer;
