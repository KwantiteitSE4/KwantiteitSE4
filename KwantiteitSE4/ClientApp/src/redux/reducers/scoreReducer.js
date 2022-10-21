import * as type from '../types';
const initialState = {
  value: [],
  currentScore: [],
  currentEndScore: []
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
    case type.SET_ENDSCORE:
      return {
        ...state,
        currentEndScore: action.endscore
      }
    default:
      return state;
  }
}
export default scoreReducer;
