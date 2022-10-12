import React, { Component, useEffect, useState } from 'react';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './CreateGame.css';
import { DatePicker, Modal, Space, Card, Form, Select, Image, Row, Col, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

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
  const [game, setGame] = useState()

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [])

  const players = useSelector((state) => state.players.value);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  console.log(players);
  return (
    <Space>
        <Row gutter={[16, 16, 16, 16]}>
        <Form
          name="add game"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
           name="Player 1"
           rules={[{ required: true, message: 'Voer een naam in voor speler 1!' }]}
           >
          <Col className='gutter-row' span={7}>
            <div className='player1'>
            <Card title="Speler 1">
                <Image className='player-portrait' src="https://dartfreakz.nl/wp-content/uploads/2021/07/WLDMTCHPLAY-RD1-VANGERWEN37A-768x511.jpg" /><br></br>
                <Select defaultValue="Wie is speler 1 van de wedstrijd">
                {players.map((item, index) => (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                ))}
                </Select>
                </Card>
            </div>
          </Col>
          </Form.Item>
          <Col className='gutter-row' span={9}>
            <div className='middleArea'>
              <Card className='date-and-time' title="Datum & tijd" size="small">
                <DatePicker className='date-picker' />
                <DatePicker className='time-picker' picker='time' />
              </Card>
              <Card className='sets-and-legs'title="Sets & Legs" size="small">
                Best of sets:
                <Select>
                  {sets}
                </Select>
                Best of legs:
                <Select>
                  {legs}
                </Select>
              </Card>
              <Card className="button-card">
                <Link to='MatchScreen'>
                  <Button>Submit form</Button>
                </Link>
            </Card>
            </div>
          </Col>
          <Col Col className='gutter-row' span={8}>
            <div className='player2'>
              <Card title="Speler 2">
                <Image className='player-portrait' src="https://e2.365dm.com/21/10/768x432/skysports-rob-cross-darts-world-grand-prix_5535273.jpg?20211117161322" /><br></br>
                <Select defaultValue="Wie is speler 2 van de wedstrijd">
                {players.map((item, index) => (
                  <Option value={item.name} key={index}>
                    {item.name}
                  </Option>
                ))}
                </Select>
              </Card>
            </div>
          </Col>
          </Form>
        </Row>
    </Space>
  )
}
export default CreateGame;
