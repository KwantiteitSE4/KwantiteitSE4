import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Avatar, Input, Divider, List, Skeleton, Dropdown, Menu, Icon } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'antd/dist/antd.css';
import './MatchOverview.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchAllGames, fetchGames } from '../redux/actions/getGames';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';
import { setCurrentMatchTrue } from '../redux/actions/setCurrentGame';

export const MatchOverview = () => {
  const displayName = MatchOverview.name;

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [])

  const games = useSelector((state) => state.games.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [value, setValue] = useState();
  const [currentlyDisplayed, setDisplayed] = useState();

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
    setSearch('');
    setValue(key.key);
    setDisplayed(games);
  };

  const filterBy = (event) => {
    const no = 'no winner';
    switch(value) {
      case 'Winner':
        const currentSearch = event.target.value;
        let winnerDisplayed = games.filter(game => (game.winner === null ? no.includes(currentSearch.toLowerCase()) : game.winner.name.toLowerCase().includes(currentSearch.toLowerCase())));
        setSearch(currentSearch)
        setDisplayed(winnerDisplayed);
        break;
      case 'Players':
        const currentSearch2 = event.target.value
        let playerDisplayed = games.filter(game => game.player1.name.toLowerCase().includes(currentSearch2.toLowerCase()) || game.player2.name.toLowerCase().includes(currentSearch2.toLowerCase()));
        setSearch(currentSearch2);
        setDisplayed(playerDisplayed);
        break;
      case 'Nothing':
        setSearch('');
        setDisplayed(games)
        break;
    }
  }

  const menu = (
    <Menu onClick={onClick} items={menuItems} />
  );

  return (
    <div className='matchoverview'>
      <div className='matchoverview__matchList'>
        <div className='matchoverview__matchList__header'>
            <h3 className='matchoverview__matchListTableHeader'>Matches</h3>
            <Dropdown className="matchoverview__matchFilter" overlay={menu}>
              <a className="ant-dropdown-link">
                Filter By {value}
              </a>
            </Dropdown>
            <div className='matchoverview__matchListInput'>
                <Input type="text" disabled={value == null || value == 'Nothing'} name='' onChange={filterBy} id="searchMatch" value={search} placeholder="Search name"/>
            </div>
        </div>
        <div
            id="scrollableDiv"
            style={{
                height: 600,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
          <List
            dataSource={currentlyDisplayed != null ? currentlyDisplayed : games}
            renderItem={(item) => (
              <List.Item key={item.gameID}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture} />}
                  title={ (new Date(item.gameDateTime)).toLocaleString() + ': ' + item.player1.name + ' vs ' + item.player2.name}
                  description={"Winner: " + (item.winner != null ? item.winner.name : "No Winner") + ' | Number of Sets: ' + item.numberOfSets + ' | Number of Legs: ' + item.numberOfLegs}
                />
                <Link className='matchoverview__data__edit' to='/MatchEditor' onClick={() => {dispatch(fetchCurrentGame(item.gameID)), dispatch(setCurrentMatchTrue())}}>
                  <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                </Link>
                  {item.winnerID ? <img className='matchoverview__data__status__icon' src="https://img.icons8.com/fluency/144/000000/checkmark.png"/> : <img className='matchoverview__data__status__icon' src="https://img.icons8.com/emoji/96/000000/cross-mark-emoji.png"/> }
              </List.Item>
            )}
            />
        </div>
      </div>
    </div>
  )
}
