import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, List, Dropdown, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import './MatchOverview.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGames } from '../redux/actions/getGames';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';
import { setCurrentMatchTrue } from '../redux/actions/setCurrentGame';
import { fetchAllPlayers } from '../redux/actions/getPlayers';

export function searchFilter(searchTerm, games, filterType) {
  // Function to filter displayed games based on the entered searchTerm and the given filterType
  const no = 'no winner';
  let toBeDisplayed;
  switch (filterType) {
    case 'Winner':
      toBeDisplayed = games.filter(game => (game.winner === null ? no.includes(searchTerm.toLowerCase()) : game.winner.name.toLowerCase().includes(searchTerm.toLowerCase())));
      return [toBeDisplayed, searchTerm]
    case 'Players':
      toBeDisplayed = games.filter(game => game.player1.name.toLowerCase().includes(searchTerm.toLowerCase()) || game.player2.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return [toBeDisplayed, searchTerm]
    case 'Nothing':
      return [games, '']
  }
}

export const MatchOverview = () => {
  // const displayName = MatchOverview.name;

  useEffect(() => {
    dispatch(fetchAllGames());
    dispatch(fetchAllPlayers());
  }, [])

  const [size] = useState('large');
  const games = useSelector((state) => state.games.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [value, setValue] = useState();
  const [currentlyDisplayed, setDisplayed] = useState();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'Winner',
      label: 'Winner'
    },
    {
      key: 'Players',
      label: 'Players'
    },
    {
      key: 'Nothing',
      label: 'Clear Filter'
    }
  ]

  const onClick = (key) => {
    // onClick to set filter key
    setSearch('');
    setValue(key.key);
    setDisplayed(games);
  };

  const filterBy = (event) => {
    // onChange const that handles filtering
    const [toDisplay, searchTerm] = searchFilter(event.target.value, games, value)
    setSearch(searchTerm);
    setDisplayed(toDisplay)
  }

  const menu = (
    <Menu onClick={onClick} items={menuItems} />
  );

  async function dispatchOnClick (item, link) {
    // onClick to get data from database and navigate to given link
    await dispatch(fetchCurrentGame(item.gameID));
    await dispatch(setCurrentMatchTrue());
    navigate(link);
  }

  const buttonCompleted = (
    <Button className='button__completed' type="primary" size={size} disabled={true}>
      Completed
    </Button>
  );

  const buttonContinue = (
    <Button className='button__continue' type="primary" size={size}>
      Continue
    </Button>
  );

  return (
    <div className='matchoverview'>
      <div className='matchoverview__matchList'>
        <div className='matchoverview__matchList__header'>
            <h3 className='matchoverview__matchListTableHeader'>Matches</h3>
            <Dropdown className='matchoverview__matchFilter' overlay={menu}>
              <a className='ant-dropdown-link'>
                Filter By {value}
              </a>
            </Dropdown>
            <div className='matchoverview__matchListInput'>
                <Input type='text' disabled={value == null || value === 'Nothing'} name='' onChange={filterBy} id='searchMatch' value={search} placeholder='Search name'/>
            </div>
        </div>
        <div
            id='scrollableDiv'
            style={{
              height: 600,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)'
            }}
        >
          <List
            dataSource={currentlyDisplayed != null ? currentlyDisplayed : games}
            renderItem={(item) => (
              <List.Item className='matchoverview__matchListItem' key={item.gameID}>
                <List.Item.Meta
                  title={ (new Date(item.gameDateTime)).toLocaleString() + ': ' + item.player1.name + ' vs ' + item.player2.name}
                  description={'Winner: ' + (item.winner != null ? item.winner.name : 'No Winner') + ' | Number of Sets: ' + item.numberOfSets + ' | Number of Legs: ' + item.numberOfLegs}
                />
                <span className='matchoverview__data__edit' onClick={ () => (dispatchOnClick(item, '/MatchEditor')) }>
                  <img className='matchoverview__data__edit__icon' src='https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png'/>
                </span>
                <span onClick={ () => (dispatchOnClick(item, '/MatchScreen')) }>
                  {item.winnerID ? buttonCompleted : buttonContinue }
                </span>
              </List.Item>
            )}
            />
        </div>
      </div>
    </div>
  )
}
