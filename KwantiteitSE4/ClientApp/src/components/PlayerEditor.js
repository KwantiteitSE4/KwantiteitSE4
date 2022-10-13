import { Input, Button, Radio } from 'antd';
import React, { Component, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postEditPlayer } from '../redux/actions/editPlayer';
import './PlayerEditor.css';

export const PlayerEditor = () => {
  const ref = useRef(null);

  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    setName(event.target.value);

    console.log('value is:', event.target.value);
  }

  const displayName = PlayerEditor.name;
  const store = useSelector((state) => state.players)
  const players = store.value;
  const currentPlayer = store.currentPlayer;

  console.log(ref.value);

  return (
    <div className='playereditor'>
        <div className='playereditor__info'>
            <img className='playereditor__info__image' src='https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png' />
            <div className='playereditor__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'><Input type="text" ref={ref} id="playerName" onChange={handleChange} placeholder={currentPlayer?.name} value={name}/></th>
                    </tr>
                    <tr>
                        <td>Player ID</td>
                        <td className='playereditor__infoTableRight'>{currentPlayer?.playerID}</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td className='playereditor__infoTableRight'>{currentPlayer?.matchesWon}</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td className='playereditor__infoTableRight'>{currentPlayer?.averageScore}</td>
                    </tr>
                </table>
                <div className='playereditor__infoTableButton'>
                    <button className='test' type="primary" shape="round" onClick={() => dispatch(postEditPlayer(currentPlayer?.playerID, name))}>Submit</button>
                </div>
            </div>
        </div>
        <div className='playereditor__playedmatches'>
                <table>
                    <tr>
                        <th colSpan='4'>Player Match History</th>
                    </tr>
                    <tr>
                        <th>Match</th>
                        <th>###</th>
                        <th>Final Score</th>
                        <th>Opponent</th>
                    </tr>
                    <tr>
                        <td>Match</td>
                        <td>
                            <Link className='playereditor__playedmatches__matchedit' to='/MatchEditor'>
                                <img className='playereditor__playedmatches__matchedit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                            </Link>
                        </td>
                        <td>145 - 0</td>
                        <td>Player 2</td>
                    </tr>
                </table>
        </div>
      </div>
  )
};
