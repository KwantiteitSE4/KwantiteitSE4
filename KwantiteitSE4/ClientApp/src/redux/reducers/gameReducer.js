import axios from 'axios';

const response = axios.get('https://localhost:5001/Games');

const initialState = {
  games: response.data
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETGAMES': {
      return { ...state, games: action.payload }
    }
  }
  return state;
}

export default gameReducer;
