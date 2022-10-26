import React, { useEffect, useState } from 'react';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './CreateGame.css';
import { fetchCurrentGame } from '../redux/actions/getCurrentGame';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Form, Select, Button } from 'antd';
import { setCurrentMatchTrue } from '../redux/actions/setCurrentGame';
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

export const CreateGame = () => {
  const [countryPlayer1, setCountryPlayer1] = useState('NL')
  const [countryPlayer2, setCountryPlayer2] = useState('NL')

  const navigate = useNavigate();
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [])

  const postNewGame = (values) => {
    return axios.post(axios.defaults.baseURL + '/Games/Create', {
      gameDateTime: values.gameDateTime,
      numberOfLegs: values.numberOfLegs,
      numberOfSets: values.numberOfSets,
      player1ID: values.player1ID,
      player2ID: values.player2ID
    }).then(response => {
      console.log(response)
      postNewSet(response.data, values.startPlayerID)
      dispatch(fetchCurrentGame(response.data));
      dispatch(setCurrentMatchTrue());
    })
      .catch(error => {
        throw (error);
      })
  }

  const players = useSelector((state) => state.players.value);
  const dispatch = useDispatch();

  const postNewSet = (gameID, startPlayerID) => {
    return axios.post(axios.defaults.baseURL + '/Sets/Create', {
      gameID
    }).then(response => {
      console.log(response)
      postNewLeg(response.data, startPlayerID)
    })
      .catch(error => {
        throw (error);
      })
  }

  const postNewLeg = (setID, startPlayerID) => {
    return axios.post(axios.defaults.baseURL + '/Legs/Create', {
      setID, startPlayerID
    }).then(response => {
      console.log(response)
      postNewTurn(response.data, startPlayerID, '501')
    })
      .catch(error => {
        throw (error);
      })
  }

  const postNewTurn = (legID, startPlayerID, endScore) => {
    return axios.post(axios.defaults.baseURL + '/Turns/Create', {
      legID, playerID: startPlayerID, endScore
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        throw (error);
      })
  }

  const onChangePlayer1 = (event) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerID === event) {
        setCountryPlayer1(players[i].country)
      }
    }
  }

  const onChangePlayer2 = (event) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].playerID === event) {
        setCountryPlayer2(players[i].country)
      }
    }
  }

  const onClick = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        values.gameDateTime = values.gameDateTime._d.toISOString()
        if (values.startPlayerID === 'Speler 1') {
          values.startPlayerID = values.player1ID
        } else if (values.startPlayerID === 'Speler 2') {
          values.startPlayerID = values.player2ID
        }
        console.log(values.gameDateTime)
        form.resetFields()
        postNewGame(values)
        console.log('Validation succeeded', values)
        navigate('/MatchScreen')
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  console.log(players);
  return (
    <div>
      <img className='country1' src={`https://countryflagsapi.com/png/${countryPlayer1}`}></img>
      <img className='country2' src={`https://countryflagsapi.com/png/${countryPlayer2}`}></img>
    <Form
        name="addGame"
        form={form}
        initialValues={{
          modifier: 'public',
          state: 'Open',
          deadline: moment()
        }}>
              <Form.Item className='selectPlayer1' name="player1ID">
                <Select className='select' onChange={onChangePlayer1} defaultValue="Selecteer speler 1">
                {players.map((item) => (
                  <Option value={item.playerID} key={item.playerID}>
                    {item.name}
                  </Option>
                ))}
                </Select>
              </Form.Item>

              <Form.Item className='selectDate' label="Datum" name="gameDateTime">
                <DatePicker mode="date" className='date-picker' />
              </Form.Item>
              <Form.Item className='selectSet' name="numberOfSets" label="Aantal sets">
                <Select>
                  {sets.map((set, index) => (
                    <Option value={set} key={index}>
                      {set}
                    </Option>
                  ))}
                </Select>
                </Form.Item>
                <Form.Item className='selectLeg' name="numberOfLegs" label= "Aantal legs">
                <Select className='select'>
                {legs.map((leg, index) => (
                    <Option value={leg} key={index}>
                      {leg}
                    </Option>
                ))}
                </Select>
                </Form.Item>
              <Form.Item className='selectPlayer2' name="player2ID">
                <Select onChange={onChangePlayer2} className='select' defaultValue="Selecteer speler 2">
                {players.map((item) => (
                  <Option value={item.playerID} key={item.playerID}>
                    {item.name}
                  </Option>
                ))}
                </Select>
              </Form.Item>
              <Form.Item className='selectStart' label="Wie mag er beginnen" name="startPlayerID">
                <Select className='select'>
                  <Option value='Speler 1' index='1'></Option>
                  <Option value='Speler 2' index='2'></Option>
                </Select>
              </Form.Item>
              <Button className="submitButton" onClick={onClick}>Submit form</Button>
      </Form>
      </div>
  )
}
export default CreateGame;
