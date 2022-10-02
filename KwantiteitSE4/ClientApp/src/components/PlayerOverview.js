import { Avatar, Divider, List, Skeleton } from 'antd';
import { React, Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PlayerOverview.css';

export const PlayerOverview = () => {
  const displayName = PlayerOverview.name;

  return (
      <div className='playeroverview'>
        <div className='playeroverview__playerList'>
            <ul>
                    <li className='playeroverview__playerListTitle'><h4>Players</h4></li>
                <li>Player 1
                    <Link className='playeroverview__playerlist__PlayerEdit' to='/PlayerEditor'>
                        <img className='playeroverview__playerlist__playeredit__logo' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                </li>
                <li>Player 2
                    <Link className='playeroverview__playerlist__PlayerEdit' to='/PlayerEditor'>
                        <img className='playeroverview__playerlist__playeredit__logo' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                </li>
                <li>Player 3
                    <Link className='playeroverview__playerlist__PlayerEdit' to='/PlayerEditor'>
                        <img className='playeroverview__playerlist__playeredit__logo' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                </li>
            </ul>
        </div>
        <div className='playeroverview__info'>
            <img className='playeroverview__info__image' src='https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png' />
            <div className='playeroverview__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'>Player Name</th>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td className='playeroverview__infoTableRight'>###</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td className='playeroverview__infoTableRight'>###</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td className='playeroverview__infoTableRight'>###</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
  )
}
