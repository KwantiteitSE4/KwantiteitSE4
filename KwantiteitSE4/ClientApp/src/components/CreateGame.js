import React, { useEffect } from 'react';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './CreateGame.css';
import { DatePicker, Form, Select, Button } from 'antd';
import moment from 'moment'
import axios from 'axios';

const { Option } = Select;
const sets = [];
const legs = [];

const maxSetCount = 14;
const maxLegCount = 22;

for (let i = 1; i < maxSetCount; i++) {
  sets.push(i);
}
for (let i = 1; i < maxLegCount; i++) {
  legs.push(i);
}

export const postNewGame = (values) => {
  return axios.post('https://localhost:44308/Games/Create', {
    gameDateTime: values.gameDateTime,
    numberOfLegs: values.numberOfLegs,
    numberOfSets: values.numberOfSets,
    player1ID: values.player1ID,
    player2ID: values.player2ID
  }).then(response => {
    console.log(response)
  })
    .catch(error => {
      throw (error);
    })
}

export const CreateGame = () => {
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [])

  const players = useSelector((state) => state.players.value);
  const dispatch = useDispatch();

  const onClick = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        values.gameDateTime = values.gameDateTime._d.toISOString()
        console.log(values.gameDateTime)
        form.resetFields()
        postNewGame(values)
        console.log('Validation succeeded', values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  console.log(players);
  return (
    <Form
        name="addGame"
        form={form}
        initialValues={{
          modifier: 'public',
          state: 'Open',
          deadline: moment()
        }}>
              <Form.Item name="player1ID">
                <Select defaultValue="Wie is speler 1 van de wedstrijd">
                {players.map((item) => (
                  <Option value={item.playerID} key={item.playerID}>
                    {item.name}
                  </Option>
                ))}
                </Select>
              </Form.Item>

              <Form.Item name="gameDateTime">
                <DatePicker mode="date" className='date-picker' />
              </Form.Item>
              <Form.Item name="numberOfSets" label="Aantal sets">
                <Select>
                  {sets.map((set, index) => (
                    <Option value={set} key={index}>
                      {set}
                    </Option>
                  ))}
                </Select>
                </Form.Item>
                <Form.Item name="numberOfLegs" label= "Aantal legs">
                <Select>
                {legs.map((leg, index) => (
                    <Option value={leg} key={index}>
                      {leg}
                    </Option>
                ))}
                </Select>
                </Form.Item>
              <Form.Item name="player2ID">
                <Select defaultValue="Wie is speler 2 van de wedstrijd">
                {players.map((item) => (
                  <Option value={item.playerID} key={item.playerID}>
                    {item.name}
                  </Option>
                ))}
                </Select>
              </Form.Item>
              <Button onClick={onClick}>Submit form</Button>
      </Form>
  )
}
export default CreateGame;
