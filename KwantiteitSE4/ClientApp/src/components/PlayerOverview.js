import { Avatar, List, Input } from 'antd';
import VirtualList from 'rc-virtual-list';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlayerOverview.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { fetchAllGames } from '../redux/actions/getGames';
import { fetchPlayerGames } from '../redux/actions/getPlayerMatches';
import { setCurrentPlayer } from '../redux/actions/setCurrentPlayer';

export function searchFilter (searchTerm, players) {
  return players.filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

export const PlayerOverview = () => {
  // const displayName = PlayerOverview.name;

  const [name] = useState();
  const [currentlyDisplayed, setDisplayed] = useState();

  const store = useSelector((state) => state.players)
  const players = store.value;
  const currentPlayer = store.currentPlayer;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allGames = useSelector((state) => state.games.value);

  const searchPlayerName = (event) => {
    const newDisplayed = searchFilter(event.target.value, players);
    setDisplayed(newDisplayed);
  }

  useEffect(() => {
    dispatch(fetchAllPlayers())
    dispatch(fetchAllGames());
  }, [])

  async function currentPlayerFunc (player, link) {
    await dispatch(fetchPlayerGames(player.playerID))
    // calculate matches won and add to player
    let matchesWon = 0;
    allGames?.forEach(game => {
      if (game.winnerID === player.playerID) {
        matchesWon++;
      }
    });
    player.matchesWon = matchesWon;
    await dispatch(setCurrentPlayer(player));
    if (link !== '') {
      navigate(link);
    }
  }
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return (
      <div className='playeroverview'>
        <div className='playeroverview__playerList'>
        <div className='playeroverview__playerList__header'>
            <h3 className='playeroverview__playerListTableHeader'>Players</h3>
            <div className='playeroverview__playerListInput'>
                <Input type="text" name="" id="searchPlayer" onChange={searchPlayerName} value={name} placeholder="Search player"/>
            </div>
        </div>
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
                            onClick={() => currentPlayerFunc(item, '')}
                            avatar={<Avatar src={`https://countryflagsapi.com/png/${item.country}`} />}
                            title={item.name}
                        />
                        <span className='matchoverview__data__edit' onClick={() => currentPlayerFunc(item, '/PlayerEditor')}>
                            <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                        </span>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
        </div>
        <div className='playeroverview__info'>
            <div className='playeroverview__info__data'></div>
            <img className='playeroverview__info__image' src={ currentPlayer?.name ? `https://countryflagsapi.com/png/${currentPlayer?.country}` : 'https://www.pngkey.com/png/full/1-10320_stop-sign-vector-graphics.png'}/>
            <div className='playeroverview__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'>{currentPlayer?.name ? currentPlayer?.name : 'No Player Selected'}</th>
                    </tr>
                    <tr>
                        <td>Player ID</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.playerID ? currentPlayer?.playerID : '-'}</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.matchesWon != null ? currentPlayer?.matchesWon : '-'}</td>
                    </tr>
                    <tr>
                        <td>Nationality</td>
                        <td className='playeroverview__infoTableRight'>{currentPlayer?.country ? regionNames.of(currentPlayer?.country) : '-'}</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
  )
}
