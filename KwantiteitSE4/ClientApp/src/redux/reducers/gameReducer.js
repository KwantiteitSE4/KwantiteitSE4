import * as type from '../types';

const initialState = {
  value: []
}

function gameReducer (state = initialState, action) {
  switch (action.type) {
    case type.GET_GAMES:
      return {
        value: action.payload
      }
    default:
      return state;
  }
}

export default gameReducer;
