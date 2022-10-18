import * as type from '../types';
const initialState = {
  value: [],
  currentScore: []
};
function scoreReducer (state = initialState, action) {
  switch (action.type) {
    case type.SET_SCORE:
      return {
        ...state,
        value: action.score
      }
    case type.GET_SCORE:
      return {
        ...state,
        currentScore: action.payload
      }
    default:
      return state;
  }
}
export default scoreReducer;
