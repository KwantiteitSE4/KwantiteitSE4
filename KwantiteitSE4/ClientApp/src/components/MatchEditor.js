import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './MatchEditor.css';

export const MatchEditor = () => {
  const displayName = MatchEditor.name;

  return (
      <div className='matcheditor'>
        <div className='matcheditor__scoreinput'>
            <table>
                <tr>
                    <th>Player Name <br/> Turn Count</th>
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
                    <th>61</th>
                </tr>
            </table>
            <div className='matcheditor__scoreinput__options'>
                <Button type='default' className='matcheditor__scoreinput__Button'>
                    Enter
                </Button>
                <Button type='default' className='matcheditor__scoreinput__Button'>
                    <img className='matcheditor__scoreinput__undo' src="https://findicons.com/files/icons/2315/default_icon/256/undo.png" />
                </Button>
            </div>
        </div>
        <div className='matcheditor__scoretracker'>
            <table>
                <tr>
                    <th colSpan='2'>🟢 Player 1</th>
                    <td colSpan='1'></td>
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
                    <td></td>
                    <td></td>
                    <td>3</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th colSpan='2'>Total: 280</th>
                    <td colSpan='1'></td>
                    <th colSpan='2'>Total: 241</th>
                </tr>
            </table>
        </div>
      </div>
  )
}
