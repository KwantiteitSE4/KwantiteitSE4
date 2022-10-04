import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './PlayerEditor.css';

export const PlayerEditor = () => {
  const displayName = PlayerEditor.name;

  return (
      <div className='playereditor'>
        <div className='playereditor__info'>
            <img className='playeroverview__info__image' src='https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png' />
            <div className='playereditor__info__data'>
                <table>
                    <tr>
                        <th colSpan='2'>Player Name</th>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td className='playereditor__infoTableRight'>###</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td className='playereditor__infoTableRight'>###</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td className='playereditor__infoTableRight'>###</td>
                    </tr>
                </table>
            </div>
        </div>
        <div className='playereditor__playedmatches'>
                <table>
                    <tr>
                        <th colSpan='4'>Player Match History</th>
                    </tr>
                    <tr>
                        <th>Match</th>
                        <th>###</th>
                        <th>Final Score</th>
                        <th>Opponent</th>
                    </tr>
                    <tr>
                        <td>Match</td>
                        <td>
                            <Link className='playereditor__playedmatches__matchedit' to='/MatchEditor'>
                                <img className='playereditor__playedmatches__matchedit__icon' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                            </Link>
                        </td>
                        <td>145 - 0</td>
                        <td>Player 2</td>
                    </tr>
                </table>
        </div>
      </div>
  )
};
