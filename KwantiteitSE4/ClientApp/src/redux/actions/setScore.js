import * as type from '../types';
import axios from 'axios';

export function postScore(score) {
  return function (dispatch) {
    return axios.post('https://localhost:3000/Throws/EnterThrows');
  }
}

export const setCurrentScore = (scores) => {
  return {
    type: type.SET_SCORE,
    score: CalculateScore(scores)
  }
}
export const CalculateScore = (scoreInput) => {
  const totalScoreArray = [];
  const characterRegex = /[a-z, A-Z]/gm;
  const numberRegex = /[0-9]{1,2}/gm;
  const availableScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  for (let i = 0; i < scoreInput.length; i++) {
    const multiplier = scoreInput[i].match(characterRegex);
    const throwScore = scoreInput[i].match(numberRegex);
    const multipliers = {
      S: 1,
      D: 2,
      T: 3
    }
    if (multiplier in multipliers && throwScore in availableScores) {
      const multipliedScore = throwScore * multipliers[multiplier];
      totalScoreArray.push(multipliedScore);
    }
  }
  const sum = totalScoreArray.reduce((previousValue, current) => {
    return previousValue + current;
  }, 0);
  return sum;
}
