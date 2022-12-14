import React, { useEffect, useState } from 'react';
import { Button, Input, List } from 'antd';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { postScore } from '../redux/actions/setScore';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';
import { postNewThrow, postNewTurn, editCurrentTurn } from '../redux/actions/setMatchScreen'

const turnCount = 0;
let newScore = [];
let throwScore;
let multiplier;
let singleThrowScore;
let endScore = 0;
let currentSet;
let currentLeg;
let currentTurn;

export const getGame = () => {
}
export const getTurnCount = () => {
  return turnCount;
}

function getEndScore(currentGame) {
  if (currentGame.sets.at(-1).legs.at(-1).turns.length >= 2) return currentGame.sets.at(-1).legs.at(-1).turns.at(-2).endScore;
  else return 501;
}

let creatingTurn = false;

export function checkCurrentGame(currentGame, dispatch) {
  if (currentGame === undefined || currentGame === null) {
    console.log('currentgame is empty');
    return false
  } else if (currentGame.sets === undefined || currentGame.sets === null) {
    console.log('sets are empty');
    return false;
  } else if (currentGame.sets.at(-1).legs === undefined || currentGame.sets.at(-1).legs === null) {
    console.log('legs are empty');
    return false;
  } else if (currentGame.sets.at(-1).legs.at(-1).turns === undefined || currentGame.sets.at(-1).legs.at(-1).turns === null) {
    console.log('turns are empty');
    return false;
  } else if (currentGame.sets.at(-1).legs.at(-1).turns.at(-1).throws.length > 0 && !creatingTurn) {
    console.log('last turn had throws');
    console.log(currentGame.sets.at(-1).legs.at(-1).turns.at(-1).throws);
    creatingTurn = true;
    if (currentGame.sets.at(-1).legs.at(-1).turns.at(-1).playerID === currentGame.player1ID) {
      dispatch(postNewTurn(currentGame.sets.at(-1).legs.at(-1).legID, currentGame.player2ID, getEndScore(currentGame)));
    } else {
      dispatch(postNewTurn(currentGame.sets.at(-1).legs.at(-1).legID, currentGame.player1ID, getEndScore(currentGame)));
    }
    return false;
  } else if (currentGame.sets.at(-1).legs.at(-1).turns.at(-1).throws.length > 0 && creatingTurn) {
    console.log('creating turn');
    console.log(currentGame.sets.at(-1).legs.at(-1).turns.at(-1).throws);
    return false;
  } else {
    if (creatingTurn) {
      // store weggooien en database ophalen in store || voeg turn toe aan store
      dispatch(fetchCurrentGame(currentGame.gameID));
      creatingTurn = false;
      return false;
    }
    creatingTurn = false;
    return true;
  }
}

export const MatchScreen = () => {
  useEffect(() => {
    // Anti = Lint comment
    setPlayer1Turns(currentLeg?.turns.filter(turn => turn.playerID === currentGame.player1ID));
    setPlayer2Turns(currentLeg?.turns.filter(turn => turn.playerID === currentGame.player2ID));
  }, []);

  const dispatch = useDispatch();

  const [player1Turns, setPlayer1Turns] = useState();
  const [player2Turns, setPlayer2Turns] = useState();

  const [firstThrow, setFirstThrow] = useState('');
  const [secondThrow, setSecondThrow] = useState('');
  const [thirdThrow, setThirdThrow] = useState('');

  const currentGame = useSelector((state) => state.games.currentGame);

  if (checkCurrentGame(currentGame, dispatch)) {
    console.log('currentgame is filled');
    console.log(currentGame);
    currentSet = currentGame.sets.at(-1);
    currentLeg = currentSet.legs.at(-1);
    currentTurn = currentLeg.turns.at(-1);
  } else {
    console.log('current game is empty');
    return;
  }

  const changeHandle = (event) => {
    setFirstThrow(event.target.value);
  }
  const changeSecondThrowValue = (event) => {
    setSecondThrow(event.target.value);
  }
  const changeThirdThrowValue = (event) => {
    setThirdThrow(event.target.value);
  }

  function calculateThrowScore(gameId) {
    // De worpen van het formulier worden meegegeven aan postScore
    newScore = dispatch(postScore([firstThrow, secondThrow, thirdThrow], currentGame));
    console.log(newScore);
    // Als een waarde in het formulier niet correct ingevuld is worden de worpen niet verwerkt
    if (newScore.score !== 'INVALID INPUTS') {
      throwScore = newScore.score[0][0];
      endScore = newScore.score[0][1];

      // De worpen worden geformatteerd en gepusht naar de db
      for (let i = 0; i < newScore.score[1].length; i += 2) {
        multiplier = newScore.score[1][i];
        singleThrowScore = newScore.score[1][i + 1];
        console.log(singleThrowScore);
        dispatch(postNewThrow(currentTurn.turnID, multiplier, singleThrowScore));
      }
      dispatch(editCurrentTurn(currentTurn, endScore));

      // Als de eindscore 0 is wordt de functie zeroTrigger aangeroepen
      // Als de eindscore niet 0 is, wordt er een nieuwe beurt aangemaakt
      if (endScore === 0) {
        // zeroTrigger();
        console.log('ZERO!');
      } else {
        // console.log(currentTurn);
        if (currentTurn.playerID === currentGame.player1ID) {
          dispatch(postNewTurn(currentLeg.legID, currentGame.player2ID, getEndScore()));
        } else {
          dispatch(postNewTurn(currentLeg.legID, currentGame.player1ID, getEndScore()));
        }
        // currentGame = undefined;

        // await new Promise(r => setTimeout(r, 500))
        // refreshCurrentGame();
        // console.log(currentTurn);
      }

      // De inputvelden van het formulier worden geleegd
      resetInputFields();
      setPlayer1Turns(currentLeg?.turns.filter(turn => turn.playerID === currentGame.player1ID));
      setPlayer2Turns(currentLeg?.turns.filter(turn => turn.playerID === currentGame.player2ID));
    } else {
      throwScore = 'Invalid inputs';
    }
  }

  function getEndScore() {
    if (currentLeg.turns.length >= 2) return currentLeg.turns.at(-2).endScore;
    else return 501;
  }

  function resetInputFields() {
    setFirstThrow('');
    setSecondThrow('');
    setThirdThrow('');
  }

  return (
        <div className='matcheditor'>
            <div className='matcheditor__scoreinput'>
                <table>
                    <tr>
                        <th>Player Name <br /> Turn Count</th>
                    </tr>
                    <tr>
                        <td>
                            <Input className='firstInputScore' maxLength='3' type="text" id="firstThrow" value={firstThrow.toUpperCase()} onChange={changeHandle}></Input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input className='secondInputScore' maxLength='3' type="text" id="secondThrow" value={secondThrow.toUpperCase()} onChange={changeSecondThrowValue}></Input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Input className='thirdInputScore' maxLength='3' type="text" id="thirdThrow" value={thirdThrow.toUpperCase()} onChange={changeThirdThrowValue}></Input>
                        </td>
                    </tr>
                    <tr>
                        <th>{throwScore}</th>
                    </tr>
                </table>
                <div className='matcheditor__scoreinput__options'>
                    <Button type='default' className='matcheditor__scoreinput__Button' onClick={() => calculateThrowScore(currentGame.gameID)}>
                        Enter
                    </Button>
                    <Button type='default' className='matcheditor__scoreinput__Button'>
                        <img className='matcheditor__scoreinput__undo' src="https://findicons.com/files/icons/2315/default_icon/256/undo.png" />
                    </Button>
                </div>
            </div>
            <div className='matcheditor__scoretracker'>
              <div id="player1ScoreBoard">
              <p colSpan='2'>???? {currentGame.player1.name}</p>
                <List
                  dataSource={player1Turns}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        description={item.endScore}
                      />
                    </List.Item>
                  )}
                />
              </div>

              <div id="player2ScoreBoard">
                <p colSpan='2'>??? {currentGame.player2.name}</p>
                <List
                  dataSource={player2Turns}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        description={item.endScore}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
        </div>
  )
}
