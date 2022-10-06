import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from './reducers/gameReducer';
import playerReducer from './reducers/playerReducer';

export default configureStore({
  reducer: {
    games: gameReducer,
    players: playerReducer
  },
  middleware: [thunk]
})
