import * as type from '../types';

export function postScore(score, currentGame) {
  return function (dispatch) {
    return dispatch(setCurrentScore(score, currentGame));
  }
}

export const setCurrentScore = (scores, currentGame) => {
  return {
    type: type.SET_SCORE,
    score: validateScoreInput(scores, currentGame)
  }
}

export const validateScoreInput = (scoreInput, currentGame) => {
  const throwScoreArray = [];

  const characterRegex = /[a-z, A-Z]/gm;
  const numberRegex = /[0-9]{1,2}/gm;
  const availableScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let sum = 0;
  const invalidInputsArray = [];
  for (let i = 0; i < scoreInput.length; i++) {
    const multiplier = scoreInput[i].match(characterRegex);
    const throwScore = scoreInput[i].match(numberRegex);
    const multipliers = {
      S: 1,
      D: 2,
      T: 3
    }
    if (multiplier in multipliers && throwScore in availableScores) {
      console.log(multiplier);
      const multipliedScore = throwScore * multipliers[multiplier];
      sum += multipliedScore;

      throwScoreArray.push(multiplier);
      throwScoreArray.push(throwScore);
    } else {
      invalidInputsArray.push(scoreInput[i]);
    }
  }
  if (invalidInputsArray.length > 0) {
    alert(invalidInputsArray + ' is an invalid input');
    return 'INVALID INPUTS';
  }
  return validateEndScore(currentGame, sum, throwScoreArray);
}

export const validateEndScore = (currentGame, sum, throwScoreArray) => {
  const sumAndEndScoreArray = [];
  const currentScore = currentGame?.sets?.at(-1)?.legs?.at(-1)?.turns?.at(-1)?.endScore;
  if (sum > currentScore || currentScore - sum === 1) {
    console.log('Bust score');

    sum = 0;
  }

  if (sum === currentScore) {
    console.log('sum === currentScore');
    if (throwScoreArray[throwScoreArray.length - 2].toString() === 'D') {
      console.log('You win this leg');
    } else {
      console.log('Not finished with double');
      sum = 0;
    }
  }

  const endScore = currentScore - sum;

  sumAndEndScoreArray.push(sum, endScore);

  return sumAndEndScoreArray;
}
