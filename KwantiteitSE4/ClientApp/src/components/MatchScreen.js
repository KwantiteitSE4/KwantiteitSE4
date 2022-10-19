import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { postScore } from '../redux/actions/setScore';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';

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
  const gameId = 4;
  useEffect(() => {
    dispatch(fetchCurrentGame(4));
  }, []);
  const dispatch = useDispatch();

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

  const currentGame = useSelector((state) => state.games.currentGame);

  function calculateThrowScore (gameId) {
    newScore = dispatch(postScore([firstThrow, secondThrow, thirdThrow], currentGame));
    if (newScore.score !== 'INVALID INPUTS') {
      throwScore = newScore.score[0];
      endScore = newScore.score[1];
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
                    <Button type='default' className='matcheditor__scoreinput__Button' onClick={() => calculateThrowScore(gameId)}>
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
                        <th colSpan='2'>🟢 Player 1</th>
                        <td colSpan='1'></td>
                        <th colSpan='2'>⚫ Player 2</th>
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
