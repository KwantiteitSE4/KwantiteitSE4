import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';

export class MatchEditor extends Component {
  static displayName = MatchEditor.name;

  render() {
    return (
      <div className='matcheditor'>
        <div className='matcheditor__scoreinput'>
            <table>
                <tr>
                    <th>Player Name</th>
                </tr>
                <tr>
                    <th>Turn Count</th>
                </tr>
                <tr>
                    <td>D 20</td>
                </tr>
                <tr>
                    <td>D 10</td>
                </tr>
                <tr>
                    <td>S 1</td>
                </tr>
                <tr>
                    <td>61</td>
                </tr>
            </table>
            <Button type='default'>
                Enter
            </Button>
            <Button type='default'>
                <img className='matcheditor__scoreinput__undo' src="https://findicons.com/files/icons/2315/default_icon/256/undo.png" />
            </Button>
        </div>
        <div className='matcheditor__scoretracker'>
            <table>
                <tr>
                    <th colSpan='2'>🟢 Player 1</th>
                    <th colSpan='1'></th>
                    <th colSpan='2'>⚫ Player 2</th>
                </tr>
                <tr>
                    <td>Turn</td>
                    <td>Score</td>
                    <td>Round</td>
                    <td>Score</td>
                     <td>Turn</td>
                </tr>
                <tr>
                    <td>140</td>
                    <td>361</td>
                    <td>1</td>
                    <td>421</td>
                    <td>80</td>
                </tr>
                <tr>
                    <td>81</td>
                    <td>280</td>
                    <td>2</td>
                    <td>241</td>
                    <td>180</td>
                </tr>
                <tr>
                    <th colSpan='2'>Total: 280</th>
                    <th colSpan='1'></th>
                    <th colSpan='2'>Total: 241</th>
                </tr>
            </table>
        </div>
      </div>
    );
  }
}
