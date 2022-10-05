import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './MatchOverview.css';

export const MatchOverview = () => {
  const displayName = MatchOverview.name;

  return (
        <div className='matchoverview'>
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
        </div>
  )
}
