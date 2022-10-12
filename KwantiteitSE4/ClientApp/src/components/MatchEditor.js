import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Badge, Dropdown, Menu, Space, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './MatchEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';
import { fetchCurrentSet } from '../redux/actions/getCurrentSet';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: 'Action 1',
      },
      {
        key: '2',
        label: 'Action 2',
      },
    ]}
  />
);

export const MatchEditor = () => {
  const displayName = MatchEditor.name;

  const columns = [
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : "No Winner",
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner',
    },
    {
      title: 'Date and Time',
      render: (record) => (new Date(record.gameDateTime)).toLocaleString(),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.gameDateTime - b.gameDateTime,
      key: 'gameDateTime',
    },
    {
      title: 'Amount of Sets',
      dataIndex: 'numberOfSets',
      sorter: (a, b) => a.numberOfSets - b.numberOfSets,
      key: 'numberOfSets',
    },
    {
      title: 'Amount of Legs',
      dataIndex: 'numberOfLegs',
      sorter: (a, b) => a.numberOfLegs - b.numberOfLegs,
      key: 'numberOfLegs',
    },
    {
      title: 'Player 1',
      render: (record) => record.player1?.name,
      sorter: (a, b) => a.player1?.name - b.player1?.name,
      key: 'player1?.name',
    },
    {
      title: 'Player 2',
      render: (record) => record.player2?.name,
      sorter: (a, b) => a.player2?.name - b.player2?.name,
      key: 'player2?.name',
    },
  ];
  const columnsSets = [
    {
      title: 'Set ID',
      dataIndex: 'setID',
      key: 'setID',
    },
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : "No Winner",
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner',
    },
  ];
  const columnsLegs = [
    {
      title: 'Leg ID',
      dataIndex: 'legID',
      key: 'legID',
    },
    {
      title: 'Starting Player',
      render: (record) => record.startPlayer?.name,
      sorter: (a, b) => a.startPlayer?.name - b.startPlayer?.name,
      key: 'startPlayer?.name',
    },
    {
      title: 'Winner',
      render: (record) => record.winner != null ? record.winner.name : "No Winner",
      sorter: (a, b) => a.winner.name.length - b.winner.name.length,
      key: 'winner',
    },
  ];
  const columnsTurns = [
    {
      title: 'Turn ID',
      dataIndex: 'turnID',
      key: 'turnID',
    },
    {
      title: 'Player',
      render: (record) => record.player.name,
      sorter: (a, b) => a.player.name.length - b.player.name.length,
      key: 'player',
    },
    {
      title: 'Endscore',
      dataIndex: 'endScore',
      key: 'endScore',
    },
  ];
  const columnsThrows = [
    {
      title: 'Throw ID',
      dataIndex: 'throwID',
      key: 'throwID',
    },
    {
      title: 'Multiplier',
      dataIndex: 'multiplier',
      key: 'multiplier',
    },
    {
      title: 'Throw Score',
      dataIndex: 'throwScore',
      key: 'throwScore',
    },
  ];
  
  const game = useSelector((state) => state.games.currentGame);

  const dispatch = useDispatch();

  // const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // const onTableRowExpand = (expanded, record) => {
  //   const keys = [];
  //   if(expanded){
  //       keys.push(record.setID);
  //   }
  //   setExpandedRowKeys(keys);
  // }
  
  return (
    <div className='matcheditor'>
      <Table
        className='matcheditor__table'
        columns={columns}
        dataSource={[game]}
        expandedRowRender={(record, i) => 
          <Table
            columns={columnsSets}
            dataSource={record.sets}
            pagination={false}
            rowKey={record.setID}
            // expandedRowKeys={expandedRowKeys}
            // onExpand={() => {onTableRowExpand}}
            expandedRowRender={(sets, j) => 
                <Table
                columns={columnsLegs}
                dataSource={sets.legs}
                pagination={false}
                rowKey={sets.legID}
                expandedRowRender={(legs, k) => 
                    <Table
                    columns={columnsTurns}
                    dataSource={legs.turns}
                    pagination={false}
                    rowKey={legs.turnID}
                    expandedRowRender={(turns, l) => 
                        <Table
                        columns={columnsThrows}
                        dataSource={turns.throws}
                        pagination={false}
                        rowKey={turns.throwID}
                        />
                    }
                    />
                }
                />
            }
          />
        }
      />
        {/* <div className='matcheditor__scoreinput'>
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
        </div> */}
        

    </div>
  )
}
