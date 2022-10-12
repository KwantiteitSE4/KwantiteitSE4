import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List } from 'antd';
import 'antd/dist/antd.css';
import './MatchOverview.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllGames } from '../redux/actions/getGames';

export const MatchOverview = () => {
  // const displayName = MatchOverview.name;

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
              border: '1px solid rgba(140, 140, 140, 0.35)'
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
                        <Link className='matchoverview__data__edit' to='/MatchEditor'>
                            <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                        </Link>
                        <img className='matchoverview__data__status__icon' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/done-2606464-2184156.png"/>
                        </List.Item>
                    )}
                />
        </div>
    </div>
  )
}
