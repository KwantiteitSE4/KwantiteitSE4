import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './PlayerOverview.css';

export class PlayerOverview extends Component {
  static displayName = PlayerOverview.name;

  render () {
    return (
      <div className='playeroverview'>
        <div className='playeroverview__playerList'>
            <ul>
                <li><h4 className='playeroverview__playerListTitle'>Players</h4></li>
                <li>Player 1
                    <Link className='playeroverview__playerlist__PlayerEdit' to='/PlayerEditor'>
                        <img className='playeroverview__playerlist__playeredit__logo' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                </li>
                <li>Player 2</li>
                <li>Player 3</li>
            </ul>
        </div>
        <div className='playeroverview__info'>
            <div className='playeroverview__info__image'>
            </div>
            <div className='playeroverview__info__data'>
                <table>
                    <tr>
                        <th>Player Name</th>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>###</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td>###</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td>###</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
    );
  }
}
