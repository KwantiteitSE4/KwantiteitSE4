import { React, useEffect, useState } from 'react';
import { Table, Select } from 'antd';
import 'antd/dist/antd.css';
import './MatchEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { Button } from 'reactstrap';
import { postEditGame } from '../redux/actions/editGame';

export const MatchEditor = () => {
  // const displayName = MatchEditor.name;

  const columns = [
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : 'No Winner',
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner'
    },
    {
      title: 'Date and Time',
      render: (record) => (new Date(record.gameDateTime)).toLocaleString(),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gameDateTime - b.gameDateTime,
      key: 'gameDateTime'
    },
    {
      title: 'Amount of Sets',
      dataIndex: 'numberOfSets',
      sorter: (a, b) => a.numberOfSets - b.numberOfSets,
      key: 'numberOfSets'
    },
    {
      title: 'Amount of Legs',
      dataIndex: 'numberOfLegs',
      sorter: (a, b) => a.numberOfLegs - b.numberOfLegs,
      key: 'numberOfLegs'
    },
    {
      title: 'Player 1',
      render: (record) => record.player1?.name,
      sorter: (a, b) => a.player1?.name - b.player1?.name,
      key: 'player1?.name'
    },
    {
      title: 'Player 2',
      render: (record) => record.player2?.name,
      sorter: (a, b) => a.player2?.name - b.player2?.name,
      key: 'player2?.name'
    }
  ];

  const columnsSets = [
    {
      title: 'Set ID',
      dataIndex: 'setID',
      key: 'setID'
    },
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : 'No Winner',
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner'
    }
  ];

  const columnsLegs = [
    {
      title: 'Leg ID',
      dataIndex: 'legID',
      key: 'legID'
    },
    {
      title: 'Starting Player',
      render: (record) => record.startPlayer?.name,
      sorter: (a, b) => a.startPlayer?.name - b.startPlayer?.name,
      key: 'startPlayer?.name'
    },
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : 'No Winner',
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner'
    }
  ];

  const columnsTurns = [
    {
      title: 'Turn ID',
      dataIndex: 'turnID',
      key: 'turnID'
    },
    {
      title: 'Player',
      render: (record) => record.player.name,
      sorter: (a, b) => a.player.name.length - b.player.name.length,
      key: 'player'
    },
    {
      title: 'Endscore',
      dataIndex: 'endScore',
      key: 'endScore'
    }
  ];

  const columnsThrows = [
    {
      title: 'Throw ID',
      dataIndex: 'throwID',
      key: 'throwID'
    },
    {
      title: 'Multiplier',
      dataIndex: 'multiplier',
      key: 'multiplier'
    },
    {
      title: 'Throw Score',
      dataIndex: 'throwScore',
      key: 'throwScore'
    }
  ];
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [])
  
  const game = useSelector((state) => state.games.currentGame);
  const players = useSelector((state) => state.players.value);

  const [newPlayer1, setNewPlayer1] = useState(game?.player1ID);
  const [newPlayer2, setNewPlayer2] = useState(game?.player2ID);

  async function changePlayer (newPlayer1ID, newPlayer2ID) {
    const Player1InitialID = game?.player1ID
    const Player2InitialID = game?.player2ID
    console.log(newPlayer1ID)
    // player1ID / player2ID / winnerID / startPlayerID / playerID
    // game -> sets -> legs -> turns -> throws
    const newGame = [game]
    newGame.forEach(game => {
      console.log(game.gameID);
      game.player1ID = newPlayer1ID
      game.player2ID = newPlayer2ID
      switch(game.winnerID){
        case Player1InitialID:
          game.winnerID = newPlayer1ID
          break
        case Player2InitialID:
          game.winnerID = newPlayer2ID
          break
      }
      game.player1 = null
      game.player2 = null
      game.winner = null
      game.sets.forEach(set => {
        console.log(set.setID);
        switch(set.winnerID){
          case Player1InitialID:
            set.winnerID = newPlayer1ID
            break
          case Player2InitialID:
            set.winnerID = newPlayer2ID
            break
        }
        set.winner = null
        set.legs.forEach(leg => {
          console.log(leg.legID);
          switch(leg.startPlayerID){
            case Player1InitialID:
              leg.startPlayerID = newPlayer1ID
              break
            case Player2InitialID:
              leg.startPlayerID = newPlayer2ID
              break
          }
          switch(leg.winnerID){
            case Player1InitialID:
              leg.winnerID = newPlayer1ID
              break
            case Player2InitialID:
              leg.winnerID = newPlayer2ID
              break
          }
          leg.startPlayer = null
          leg.winner = null
          leg.turns.forEach(turn => {
            console.log(turn.turnID); 
            switch(turn.playerID){
              case Player1InitialID:
                turn.playerID = newPlayer1ID
                break
              case Player2InitialID:
                turn.playerID = newPlayer2ID
                break
            }  
            turn.player = null
          });  
        });
      });
    });
    console.log(JSON.stringify(newGame))
    console.log(newGame);
    await dispatch(postEditGame(newGame));
    await dispatch(fetchCurrentGame(newGame.gameID));
  };

  const handleSelectedChangePlayer1 = (event) => {
    setNewPlayer1(event);
  }

  const handleSelectedChangePlayer2 = (event) => {
    setNewPlayer2(event);
  }

  return (  
    <div className='matcheditor'>
      <div className='matcheditor__editPlayers'> 
        <Select defaultValue={game?.player1?.playerID} onChange={handleSelectedChangePlayer1}>
          {players.map((item) => (
            <Select.Option value={item.playerID} key={item.playerID}>
              {item.name.toString()}
            </Select.Option>
          ))}
        </Select>
        <Select defaultValue={game?.player2?.playerID} onChange={handleSelectedChangePlayer2}>
          {players.map((item) => (
            <Select.Option value={item.playerID} key={item.playerID}>
              {item.name.toString()}
            </Select.Option>
          ))}
        </Select>
        <Button className='button__continue' type="primary" size='large' onClick={() => changePlayer(newPlayer1, newPlayer2)}>
          Submit changes
        </Button>
      </div>
      <div className='matcheditor__gameOverview'>
        <Table
          className='matcheditor__table'
          columns={columns}
          dataSource={[game]}
          rowKey='gameID'
          expandedRowRender={(record, i) =>
            <Table
              columns={columnsSets}
              dataSource={record.sets}
              pagination={false}
              // rowKey='setID'
              rowKey={record => record.setID}
              expandedRowRender={(sets, j) =>
                  <Table
                  columns={columnsLegs}
                  dataSource={sets.legs}
                  pagination={false}
                  rowKey='legID'
                  expandedRowRender={(legs, k) =>
                      <Table
                      columns={columnsTurns}
                      dataSource={legs.turns}
                      pagination={false}
                      rowKey='turnID'
                      expandedRowRender={(turns, l) =>
                          <Table
                          columns={columnsThrows}
                          dataSource={turns.throws}
                          pagination={false}
                          rowKey='throwID'
                          />
                      }
                      />
                  }
                  />
              }
            />
          }
        />
      </div>
    </div>
  )
}
