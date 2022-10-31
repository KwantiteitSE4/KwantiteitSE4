import { Input, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEditPlayer } from '../redux/actions/editPlayer';
import './PlayerEditor.css';

export function searchFilter(searchTerm, games, key) {
  // Function to filter displayed games based on the entered searchTerm on the field slected by the key
  let filteredData;
  switch (key) {
    case 'Winner':
      filteredData = games.filter(game =>
        game.winner.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      break;
    case 'Player':
      filteredData = games.filter(game =>
        game.player1.name.toLowerCase().includes(searchTerm.toLowerCase()) || game.player2.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      break;
    default:
      break;
  }
  return filteredData
}

export const PlayerEditor = () => {
  const [name, setName] = useState('');
  // const displayName = PlayerEditor.name;
  const store = useSelector((state) => state.players)
  // const players = store.value;
  const currentPlayer = store.currentPlayer;
  const games = useSelector((state) => state.players.playerMatches);
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState(games);
  const [value, setValue] = useState('');
  const [valuePlayer, setValuePlayer] = useState('');

  const FilterByWinnerInput = (
    // const that controls the Winner filter/search Input
    <div>Winner
      <Input

        placeholder='Search Winner'
        value={value}
        onChange={e => {
          setValuePlayer('');
          const currValue = e.target.value;
          setValue(currValue);
          setDataSource(searchFilter(currValue, games, 'Winner'));
        }}
      />
    </div>
  );

  const FilterByPlayerInput = (
    // const that controls the Player filter/search Input
    <div>Player 1
      <Input
        placeholder='Search Players'
        value={valuePlayer}
        onChange={e => {
          setValue('');
          const currValue = e.target.value;
          setValuePlayer(currValue);
          // const filteredData = games.filter(game =>
          //   game.player1.name.toLowerCase().includes(currValue.toLowerCase()) || game.player2.name.toLowerCase().includes(currValue.toLowerCase())
          // );
          setDataSource(searchFilter(currValue, games, 'Player'));
        }}
      />
    </div>
  );

  const columns = [
    {
      title: FilterByWinnerInput,
      render: (record) => record.winner != null ? record.winner.name : 'No Winner'
    },
    {
      title: 'Date and Time',
      render: (record) => (new Date(record.gameDateTime)).toLocaleString(),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gameDateTime - b.gameDateTime
    },
    {
      title: 'Amount of Sets',
      dataIndex: 'numberOfSets',
      sorter: (a, b) => a.numberOfSets - b.numberOfSets
    },
    {
      title: 'Amount of Legs',
      dataIndex: 'numberOfLegs',
      sorter: (a, b) => a.numberOfLegs - b.numberOfLegs
    },
    {
      title: FilterByPlayerInput,
      render: (record) => record.player1.name
    },
    {
      title: 'Player 2',
      render: (record) => record.player2.name
    }
  ];

  const ref = useRef(null);

  const handleChange = event => {
    // Change Stored name value based on Input
    setName(event.target.value);
  }

  return (
    <div className='playereditor'>
        <div className='playereditor__info'>
            <img className='playereditor__info__image' src={`https://countryflagsapi.com/png/${currentPlayer?.country}`}/>
            <div className='playereditor__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'><Input type='text' ref={ref} id='playerName' onChange={handleChange} placeholder={currentPlayer?.name} value={name}/></th>
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
                        <td>Nationality</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.country ? currentPlayer?.country : '-'}</td>
                    </tr>
                </table>
                <div className='playereditor__infoTableButton'>
                    <button className='playereditor__infoTableButtonSubmit' type='primary' shape='round' onClick={() => dispatch(postEditPlayer(currentPlayer?.playerID, name, currentPlayer?.country, currentPlayer?.matchesWon))}>Submit</button>
                </div>
            </div>
        </div>
        <div className='playereditor__playedmatches'>
            <Table className='playereditor__playedmatchesTable' columns={columns} dataSource={value !== '' || valuePlayer !== '' ? dataSource : games}/>
        </div>
      </div>
  )
};
