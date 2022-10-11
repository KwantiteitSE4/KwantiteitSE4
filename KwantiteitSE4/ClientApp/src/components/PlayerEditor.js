import { Input, Table } from 'antd';
import React, { Component, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Radio } from 'antd';
import { postEditPlayer } from '../redux/actions/editPlayer';
import './PlayerEditor.css';
import { fetchPlayerGames } from '../redux/actions/getPlayerMatches';

export const PlayerEditor = () => {
    const columns = [
        {
          title: 'Winner',
          render: (record) => record.winner != null ? record.winner.name : "No Winner",
          sorter: (a, b) => a.winner.name.length - b.winner.name.length,
        },
        {
          title: 'Date and Time',
          render: (record) => (new Date(record.gameDateTime)).toLocaleString(),
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.gameDateTime - b.gameDateTime,
        },
        {
          title: 'Amount of Sets',
          dataIndex: 'numberOfSets',
          sorter: (a, b) => a.numberOfSets - b.numberOfSets,
        },
        {
          title: 'Amount of Legs',
          dataIndex: 'numberOfLegs',
          sorter: (a, b) => a.numberOfLegs - b.numberOfLegs,
        },
        {
          title: 'Player 1',
          render: (record) => record.player1.name,
          sorter: (a, b) => a.player1.name - b.player1.name,
        },
        {
          title: 'Player 2',
          render: (record) => record.player2.name,
          sorter: (a, b) => a.player2.name - b.player2.name,
        },
      ];
      
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

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
  const games = useSelector((state) => state.players.playerMatches);

  console.log(games)

  useEffect(() => {
    dispatch(fetchPlayerGames(currentPlayer.playerID))
  },[])

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
            <Table className='playereditor__playedmatchesTable' columns={columns} dataSource={games} onChange={onChange} />
                {/* <table>
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
                </table> */}
        </div>
      </div>
  )
};
