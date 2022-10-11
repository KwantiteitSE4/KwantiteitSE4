import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Avatar, Divider, List, Skeleton } from 'antd';
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

  console.log(games);

  return (
    <div>
        <div className='matchscrolllist'
            id="scrollableDiv"
            style={{
                height: 600,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
                <List
                    header={<div><h3>Matches</h3></div>}
                    dataSource={games}
                    renderItem={(item) => (
                        <List.Item key={item.gameID}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture} />}
                            title={ (new Date(item.gameDateTime)).toLocaleString() + ': ' + item.player1.name + ' vs ' + item.player2.name}
                            description={'Number of Sets: ' + item.numberOfSets + '  |  Number of Legs: ' + item.numberOfLegs}
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
  )
}
