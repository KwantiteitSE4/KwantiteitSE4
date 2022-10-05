import React, { Component, useEffect } from 'react';
import { fetchAllGames } from '../redux/actions/getGames';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './CreateGame.css';
import { DatePicker, Space, Card, Input, Select, Image, Row, Col, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';

const { Option } = Select;
const sets = [];
const legs = [];

const maxSetCount = 14;
const maxLegCount = 22;

for (let i = 1; i < maxSetCount; i++) {
  sets.push(<Option key={i}>{i}</Option>);
}
for (let i = 1; i < maxLegCount; i++) {
  legs.push(<Option key={i}>{i}</Option>);
}

export const CreateGame = () => {
  useEffect(() => {
    dispatch(fetchAllGames());
  }, [])

  const games = useSelector((state) => state.games.value);
  const dispatch = useDispatch();

  console.log(games);
  return (
      <Space>
        <Row gutter={[16, 16, 16, 16]}>
          <Col className='gutter-row' span={7}>
            <div className='player1'>
              <Card title="Speler 1">
                <Image className='player-portrait' src="https://dartfreakz.nl/wp-content/uploads/2021/07/WLDMTCHPLAY-RD1-VANGERWEN37A-768x511.jpg" /><br></br>
                <Select defaultValue="Wie is speler 1">
                {games.map((item, index) => (
                  <Option value={item.player1.name} key={index}>
                    {item.player1.name}
                  </Option>
                ))}
                </Select>
              </Card>
            </div>
          </Col>
          <Col className='gutter-row' span={9}>
            <div>
              <Card title="Datum & tijd" size="small">
                <DatePicker />
                <DatePicker picker='time' />
              </Card>
              <Card className='sets-and-legs'>
                Best of sets:
                <Select>
                  {sets}
                </Select>
                Best of legs:
                <Select>
                  {legs}
                </Select>
              </Card>
            </div>
          </Col>
          <Col Col className='gutter-row' span={8}>
            <div className='player2'>
              <Card title="Speler 2">
                <Image className='player-portrait' src="https://e2.365dm.com/21/10/768x432/skysports-rob-cross-darts-world-grand-prix_5535273.jpg?20211117161322" /><br></br>
                <Input className='player-name-input' placeholder="Voer naam in van speler 2" />
              </Card>
            </div>
          </Col>
        </Row>
      </Space>
  )
}
export default CreateGame;
