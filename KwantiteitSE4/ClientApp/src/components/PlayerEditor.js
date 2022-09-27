import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class PlayerEditor extends Component {
  static displayName = PlayerEditor.name;

  render () {
    return (
      <div className='playereditor'>
        <div className='playereditor__info'>
            <div className='playereditor__info__image'>
            </div>
            <div className='playereditor__info__data'>
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
        <div className='playereditor__playedmatches'>
                <table>
                    <tr>
                        <th>Player Match History</th>
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
    );
  }
}
