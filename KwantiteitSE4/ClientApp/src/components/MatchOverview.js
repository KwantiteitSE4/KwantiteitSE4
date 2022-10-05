import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'antd/dist/antd.css';
import './MatchOverview.css';
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchAllGames, fetchGames } from '../redux/actions/getGames';
import { GET_GAMES } from '../redux/types';

export const MatchOverview = () => {
  const displayName = MatchOverview.name;

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [])

  const games = useSelector((state) => state.games.value);
  const dispatch = useDispatch();

  console.log(games);

  //   const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState([]);

  //   const loadMoreData = () => {
  //     if (loading) {
  //       return;
  //     }

  //     setLoading(true);
  //     fetch('https://localhost:5001/Games')
  //       .then((res) => res.json())
  //       .then((body) => {
  //         setData([...data, ...body]);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //       });
  //   };

  //   useEffect(() => {
  //     loadMoreData();
  //   }, []);

  return (
    <div>
      <h2>{games[0]?.player1.name}</h2>
    </div>
    // <div>
    //     <div className='matchscrolllist'
    //         id="scrollableDiv"
    //         style={{
    //             height: 400,
    //             overflow: 'auto',
    //             padding: '0 16px',
    //             border: '1px solid rgba(140, 140, 140, 0.35)',
    //         }}
    //     >
    //         <InfiniteScroll
    //             dataLength={data.length}
    //             next={loadMoreData}
    //             hasMore={data.length < 50}
    //             loader={
    //             <Skeleton
    //                 avatar
    //                 paragraph={{
    //                 rows: 1,
    //                 }}
    //                 active
    //             />
    //             }
    //             endMessage={<Divider plain>All Matches Loaded</Divider>}
    //             scrollableTarget="scrollableDiv"
    //         >
    //             <List
    //                 header={<div><h3>Matches</h3> </div>}
    //                 dataSource={data}
    //                 renderItem={(item) => (
    //                     <List.Item key={item.gameID}>
    //                     <List.Item.Meta
    //                         avatar={<Avatar src={item.picture} />}
    //                         title={ (new Date(item.gameDateTime)).toLocaleString() + ': ' + item.player1.name + ' vs ' + item.player2.name}
    //                         description={'Number of Sets: ' + item.numberOfSets + '  |  Number of Legs: ' + item.numberOfLegs}
    //                     />
    //                     <Link className='matchoverview__data__edit' to='/MatchEditor'>
    //                         <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
    //                     </Link>
    //                     <img className='matchoverview__data__status__icon' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/done-2606464-2184156.png"/>
    //                     </List.Item>
    //                 )}
    //             />
    //         </InfiniteScroll>
    //     </div>
  /* <div className='matchoverview'>
            <table className='matchoverview__data'>
                    <tr>
                        <th className='matchoverview__data__title' colSpan='5'>Matches</th>
                    </tr>
                    <tr>
                        <th>Date and Time</th>
                        <th>Players</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>27/09/2022 - 12:21</td>
                        <td>Player 1 vs. Player 2</td>
                        <td>Sets: 3 | Legs: 5</td>
                        <td>
                            <Link className='matchoverview__data__edit' to='/MatchEditor'>
                                <img className='matchoverview__data__edit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                            </Link>
                        </td>
                        <td>
                            <img className='matchoverview__data__status__icon' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/done-2606464-2184156.png"/>
                        </td>
                    </tr>
            </table>
        </div> */
  // </div>
  )
}
