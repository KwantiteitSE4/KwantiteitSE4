import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from './reducers/gameReducer';

export default configureStore({
  reducer: {
    games: gameReducer
  },
  middleware: [thunk],
})
