import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { postScore } from '../redux/actions/setScore';
import { updateGame } from '../redux/actions/setCurrentGame';

const turnCount = 0;
let newScore = [];
let throwScore;
let endScore = 0;
export const getGame = () => {
}
export const getTurnCount = () => {
  return turnCount;
}

export const MatchScreen = () => {
  useEffect(() => {
    // AntiLint Comment
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentGame = useSelector((state) => state.games.currentGame);
  const currentSet = currentGame?.sets?.at(-1);
  const currentLeg = currentSet?.legs?.at(-1);
  const currentTurn = currentLeg?.turns?.at(-1);

  if (currentLeg !== undefined && (currentTurn === undefined || currentTurn === null)) {
    postNewTurn(currentLeg.legID, currentLeg.startPlayerID, 501);
  }

  function zeroTrigger() {
    if (currentGame === undefined || currentSet === undefined || currentLeg === undefined || currentTurn === undefined) return;
    // functie wordt aangeroepen op het moment dat een worp de totaalscore naar 0 brengt en door een double is uitgegooid.
    // de speler van de huidige turn is dan de winnaar van de leg
    currentLeg.winnerID = currentTurn.playerID;
    const gameWinCondition = Math.floor(currentGame.numberOfSets / 2) + 1;
    const setWinCondition = Math.floor(currentGame.numberOfLegs / 2) + 1;

    // als een leg is gewonnen wordt er gecheckt of er genoeg legs zijn gewonnen om een set te winnen.
    if (currentSet.legs.filter(l => l.winnerID === currentGame.player1ID).length >= setWinCondition || currentSet.legs.filter(l => l.winnerID === currentGame.player2ID).length >= setWinCondition) {
      // zo ja, bepaal welke speler de set heeft gewonnen.
      if (currentSet.legs.filter(l => l.winnerID === currentGame.player1ID).length >= setWinCondition) {
        currentSet.winnerID = currentGame.player1ID;
      } else {
        currentSet.winnerID = currentGame.player2ID;
      }
      // als er een set is gewonnen wordt er gecheckt of er genoeg sets zijn gewonnen om de game te winnen
      if (currentGame.sets.filter(s => s.winnerID === currentGame.player1ID).length >= gameWinCondition || currentGame.sets.filter(s => s.winnerID === currentGame.player2ID).length >= gameWinCondition) {
        // zo ja, bepaal welke speler de game heeft gewonnen
        if (currentGame.sets.filter(s => s.winnerID === currentGame.player1ID).length >= gameWinCondition) {
          currentGame.winnerID = currentGame.player1ID;
        } else {
          currentGame.winnerID = currentGame.player2ID;
        }
      // eslint-disable-next-line brace-style
      }
      // als de game nog niet gewonnen is, moet er een nieuwe set en een nieuwe leg worden gestart
      else {
        // nieuwe set, leg en turn starten
        if (currentLeg.startPlayerID === currentGame.player1ID) {
          postNewSet(currentGame.gameID, currentGame.player2ID);
        } else {
          postNewSet(currentGame.gameID, currentGame.player1ID);
        }
      }
    } else {
      // als de set nog niet gewonnen is, start dan een nieuwe leg en turn in dezelfde set
      if (currentLeg.startPlayerID === currentGame.player1ID) {
        postNewLeg(currentSet.setID, currentGame.player2ID);
      } else {
        postNewLeg(currentSet.setID, currentGame.player1ID);
      }
    }
    dispatch(updateGame(currentGame, currentSet, currentLeg));
    if (currentGame.winnerID !== null || currentGame.winnerID !== undefined) {
      navigate('/MatchOverview')
    }
  }

  function postNewSet (gameID, startPlayerID) {
    return axios.post('https://localhost:44308/Sets/Create', {
      gameID
    }).then(response => {
      console.log(response);
      postNewLeg(response.data, startPlayerID)
    }).catch(error => {
      throw (error);
    })
  }

  function postNewLeg (setID, startPlayerID) {
    return axios.post('https://localhost:44308/Legs/Create', {
      setID, startPlayerID
    }).then(response => {
      console.log(response);
      postNewTurn(response.data, startPlayerID, 501)
    }).catch(error => {
      throw (error);
    })
  }

  function postNewTurn(legID, playerID, endScore) {
    return axios.post('https://localhost:44308/Turns/Create', {
      legID, playerID, endScore
    }).then(response => {
      console.log(response);
    }).catch(error => {
      throw (error);
    })
  }

  function editCurrentTurn(turn, endScore) {
    turn.endScore = endScore;
    return axios.post('https://localhost:44308/Turns/Edit', {
      turn
    }).then(response => {
      console.log(response);
    }).catch(error => {
      throw (error);
    })
  }

  const [firstThrow, setFirstThrow] = useState('');
  const [secondThrow, setSecondThrow] = useState('');
  const [thirdThrow, setThirdThrow] = useState('');
  const changeHandle = (event) => {
    setFirstThrow(event.target.value);
  }
  const changeSecondThrowValue = (event) => {
    setSecondThrow(event.target.value);
  }
  const changeThirdThrowValue = (event) => {
    setThirdThrow(event.target.value);
  }

  function calculateThrowScore (gameId) {
    newScore = dispatch(postScore([firstThrow, secondThrow, thirdThrow], currentGame));
    if (newScore.score !== 'INVALID INPUTS') {
      throwScore = newScore.score[0];
      endScore = newScore.score[1];
      editCurrentTurn(currentTurn, endScore);
      if (endScore === 0) {
        zeroTrigger();
      }
      resetInputFields();
    } else {
      throwScore = 'Invalid inputs';
    }
  }
  function resetInputFields () {
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
                <table>
                    <tr>
                        <th colSpan='2'>🟢 {currentGame.player1.name}</th>
                        <td colSpan='1'></td>
                        <th colSpan='2'>⚫ {currentGame.player2.name}</th>
                    </tr>
                    <tr>
                        <td>Turn</td>
                        <td>Score</td>
                        <td>Round</td>
                        <td>Score</td>
                        <td>Turn</td>
                    </tr>
                    <tr>
                        <td>{throwScore}</td>
                        <td>{endScore}</td>
                        <td>1</td>
                        <td>421</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>81</td>
                        <td>280</td>
                        <td>2</td>
                        <td>241</td>
                        <td>180</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>3</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colSpan='2'>Total: 280</th>
                        <td colSpan='1'></td>
                        <th colSpan='2'>Total: 241</th>
                    </tr>
                </table>
            </div>
        </div>
  )
}
