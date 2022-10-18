import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from './reducers/gameReducer';
import playerReducer from './reducers/playerReducer';
import scoreReducer from './reducers/scoreReducer';
export default configureStore({
  reducer: {
    games: gameReducer,
    players: playerReducer,
    scores: scoreReducer
  },
  middleware: [thunk]
})
