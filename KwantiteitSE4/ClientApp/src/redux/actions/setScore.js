/* eslint-disable brace-style */
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
  const characterRegex = /[a-z, A-Z, '']/gm;
  const numberRegex = /[0-9]{1,2}/gm;
  const availableScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let sum = 0;
  const invalidInputsArray = [];
  for (let i = 0; i < scoreInput.length; i++) {
    // De inputs van het formulier worden gematcht aan de regex
    const multiplier = scoreInput[i].match(characterRegex);
    const throwScore = parseInt(scoreInput[i].match(numberRegex));
    const multipliers = {
      S: 1,
      D: 2,
      T: 3
    }
    if (multiplier in multipliers && throwScore in availableScores) {
      const multipliedScore = throwScore * multipliers[multiplier];
      sum += multipliedScore;

      throwScoreArray.push(multiplier.toString());
      throwScoreArray.push(throwScore);
    }
    // Als het inputveld leeg is wordt hiervoor een score van 0 ingevuld
    else if (scoreInput[i] === '') {
      throwScoreArray.push('S');
      throwScoreArray.push(0);
    }
    // Als de input onjuist is, wordt deze toegevoegd aan een array
    else {
      invalidInputsArray.push(scoreInput[i]);
    }
  }
  // Als er worpen onjuist ingevoerd zijn, wordt deze array teruggegeven en de berekening niet uitgevoerd
  if (invalidInputsArray.length > 0) {
    alert(invalidInputsArray + ' is an invalid input');
    return 'INVALID INPUTS';
  }
  return validateEndScore(currentGame, sum, throwScoreArray);
}

export const validateEndScore = (currentGame, sum, throwScoreArray) => {
  const sumAndEndScoreArray = [];
  const currentScore = currentGame?.sets?.at(-1)?.legs?.at(-1)?.turns?.at(-1)?.endScore;
  // Als de som van de worpen groter is dan de score die over is of de eindscore wordt 1,
  // dan is het een bust score en wordt de worp niet van het totaal afgetrokken
  if (sum > currentScore || currentScore - sum === 1) {
    console.log('Bust score');
    sum = 0;
  }

  // Als de worp de eindscore op 0 brengt wordt gecontroleerd of de laatste worp een dubbel was
  if (sum === currentScore) {
    console.log('sum === currentScore');
    for (let i = 0; i < throwScoreArray.length; i++) {
      if (throwScoreArray[throwScoreArray.length - 1] === 0) {
        throwScoreArray.pop(i);
        throwScoreArray.pop(i - 1);
      }
    }
    if (throwScoreArray[throwScoreArray.length - 2].toString() === 'D') {
      console.log('You win this leg');
    }
    // Als de laatste worp geen dubbel is, wordt de eindscore niet aangepast en wordt de som van de worpen op 0 gezet
    else {
      console.log('Not finished with double');
      sum = 0;
    }
  }

  const endScore = currentScore - sum;

  sumAndEndScoreArray.push(sum, endScore);
  // De som van de worpen en de nieuwe eindscore wordt teruggegeven
  // De array met de worpen (multiplier en score van de worp) wordt teruggegeven
  return ([sumAndEndScoreArray, throwScoreArray]);
}
