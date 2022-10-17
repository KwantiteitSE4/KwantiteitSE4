import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postScore } from '../redux/actions/setScore';

const turnCount = 0;

export const getTurnCount = () => {
  return turnCount;
}
export const MatchScreen = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.scores);
  const score = store.value;
  const currentScore = store.currentScore;
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
                        <th>{score}</th>
                    </tr>
                </table>
                <div className='matcheditor__scoreinput__options'>
                    <Button type='default' className='matcheditor__scoreinput__Button' onClick={() => dispatch(postScore([firstThrow, secondThrow, thirdThrow]))}>
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
                        <td>140</td>
                        <td>361</td>
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
