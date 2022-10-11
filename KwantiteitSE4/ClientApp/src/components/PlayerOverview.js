import { Avatar, List, Input } from 'antd';
import VirtualList from 'rc-virtual-list';
import { React, Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PlayerOverview.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchAllGames } from '../redux/actions/getGames';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { setCurrentPlayer } from '../redux/actions/setCurrentPlayer';

export const PlayerOverview = () => {
  const displayName = PlayerOverview.name;

  const [name, setName] = useState();
  const [searchTerm, setSearch] = useState();
  const [currentlyDisplayed, setDisplayed] = useState();

  const store = useSelector((state) => state.players)
  const players = store.value;
  const currentPlayer = store.currentPlayer;
  const dispatch = useDispatch();  

  const searchPlayerName = (event) => {

    // console.log(players[0]?.name.toLowerCase().includes('N'.toLowerCase()));
    let newDisplayed = players.filter(player => player.name.toLowerCase().includes(event.target.value.toLowerCase()));

    setSearch(event.target.value);
    setDisplayed(newDisplayed);
  }

  useEffect(() => {
    dispatch(fetchAllPlayers())
  },[])

  console.log(currentPlayer);

  return (
      <div className='playeroverview'>
        <div className='playeroverview__playerList'>
        <div className='playeroverview__playerList__header'>
            <h3 className='playeroverview__playerListTableHeader'>Players</h3>
            <div className='playeroverview__playerListInput'>
                <Input type="text" name="" id="searchPlayer" onChange={searchPlayerName} value={name} placeholder="Search player"/>
            </div>
        </div>
        {/* <div 
            id="scrollableDiv"
            style={{
                height: 500,
                overflow: 'auto',
                padding: '16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <List className='playeroverview__listItem'
                dataSource={currentlyDisplayed != null ? currentlyDisplayed : players}
                renderItem={(item) => (
                    <List.Item key={item.playerID}>
                    <List.Item.Meta
                        onClick={() => dispatch(setCurrentPlayer(item))}
                        avatar={<Avatar src={item.picture} />}
                        title={item.name}
                    />
                    <Link className='matchoverview__data__edit' to='/PlayerEditor' onClick={() => dispatch(setCurrentPlayer(item))}>
                        <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                    </List.Item>
                )}
            />
        </div> */}
        <div>
            <List>
                <VirtualList
                    data={currentlyDisplayed != null ? currentlyDisplayed : players}
                    height={500}
                    itemHeight={60}
                    itemKey="playerID"
                >
                    {(item) => (
                        <List.Item key={item.playerID}>
                        <List.Item.Meta
                            onClick={() => dispatch(setCurrentPlayer(item))}
                            avatar={<Avatar src={item.picture} />}
                            title={item.name}
                        />
                        <Link className='matchoverview__data__edit' onClick={() => dispatch(setCurrentPlayer(item))} to='/PlayerEditor'>
                            <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                        </Link>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
        </div>
        <div className='playeroverview__info'>
            <img className='playeroverview__info__image' src='https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png' />
            <div className='playeroverview__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'>{currentPlayer?.name ? currentPlayer?.name : players[0]?.name}</th>
                    </tr>
                    <tr>
                        <td>Player ID</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.playerID ? currentPlayer?.playerID : players[0]?.playerID}</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.matchesWon}</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.averageScore}</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
  )
}
