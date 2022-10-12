import React from 'react';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { Button, Input, Select } from 'antd';

const turnCount = 0;
export const DisplayScoreThrown = () => {
  return 'D16';
}
export const getTurnCount = () => {
  return turnCount;
}

export const MatchScreen = () => {
  // const [count, setCount] = useState(1);
  // const [total, setTotal] = useState(0);
  // const currentPlayer = 'speler1';

  const { Option } = Select

  //   const incrementTurn = () => {
  //     setCount((c) => c + 1);
  //   };
  return (
    <div className='matcheditor'>
      <div className='matcheditor__scoreinput'>
          <table>
              <tr>
                  <th>Player Name <br/> Turn Count</th>
              </tr>
              <tr>
                  <td>
                  <Select>
                      <Option value="S">S</Option>
                      <Option value="D">D</Option>
                      <Option value="T">T</Option>
                    </Select>
                    <Input className='inputScore' type="number" id="throw 1"></Input>
                    </td>
              </tr>
              <tr>
              <td>
                  <Select>
                      <Option value="S">S</Option>
                      <Option value="D">D</Option>
                      <Option value="T">T</Option>
                    </Select>
                    <Input className='inputScore' type="number" id="throw 1"></Input>
                    </td>
              </tr>
              <tr>
              <td>
                  <Select>
                      <Option value="S">S</Option>
                      <Option value="D">D</Option>
                      <Option value="T">T</Option>
                    </Select>
                    <Input className='inputScore' type="number" id="throw 1"></Input>
                    </td>
              </tr>
              <tr>
                  <th>0</th>
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
