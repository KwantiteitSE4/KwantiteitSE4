import React, { useEffect, useState } from 'react';
import { fetchAllPlayers } from '../redux/actions/getPlayers';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './CreateGame.css';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Form, Select, Button, Modal, Input } from 'antd';
import moment from 'moment'
import { postNewGame } from '../redux/actions/postGame';
import { postNewPlayer } from '../redux/actions/postNewPlayer';

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
  const [playerFormVisible, setPlayerFormVisible] = useState(false)
  const [countryPlayer1, setCountryPlayer1] = useState('NL')
  const [countryPlayer2, setCountryPlayer2] = useState('NL')

  const navigate = useNavigate();
  const [matchForm] = Form.useForm()
  const [newPlayerForm] = Form.useForm()
  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [])

  const players = useSelector((state) => state.players.value);
  const dispatch = useDispatch();

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

  const onClickSubmitForm = () => {
    newPlayerForm
      .validateFields()
      .then((values) => {
        console.log(values)
        newPlayerForm.resetFields()
        postNewPlayer(values)
        console.log('Validation succeeded', values)
        setPlayerFormVisible(false)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const onClickSaveMatch = () => {
    matchForm
      .validateFields()
      .then((values) => {
        console.log(values)
        values.gameDateTime = values.gameDateTime._d.toISOString()
        if (values.startPlayerID === 'Speler 1') {
          values.startPlayerID = values.player1ID
        } else if (values.startPlayerID === 'Speler 2') {
          values.startPlayerID = values.player2ID
        }
        dispatch(postNewGame(values))
        console.log('Validation succeeded', values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const onClickStartMatch = () => {
    navigate('/MatchScreen')
  }

  const onCancel = () => {
    setPlayerFormVisible(false)
    newPlayerForm.resetFields()
  }

  const onClickNewPlayer = () => {
    setPlayerFormVisible(true)
  }

  return (
    <div>
      <img className='country1' src={`https://countryflagsapi.com/png/${countryPlayer1}`}></img>
      <img className='country2' src={`https://countryflagsapi.com/png/${countryPlayer2}`}></img>
      <Button className="newPlayerButton1" onClick={onClickNewPlayer}>Maak nieuwe speler aan</Button>
      <Button className="newPlayerButton2" onClick={onClickNewPlayer}>Maak nieuwe speler aan</Button>
    <Form
        name="addGame"
        form={matchForm}
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
              <Button className="submitButton" onClick={onClickSaveMatch}>Sla spel op</Button>
              <Button className="submitButton" onClick={onClickStartMatch}>Start spel</Button>
            </Form>
        <Modal
          title="Voeg speler toe"
          visible={playerFormVisible}
          onOk={onClickSubmitForm}
          onCancel={onCancel}>
          <Form
            name="addPlayer"
            form={newPlayerForm}
            initialValues={{
              modifier: 'public',
              state: 'Open',
              deadline: moment()
            }}>
        <Form.Item label="Naam" name="name" rules={[{ required: true, message: 'Vul een naam in' }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Land (moet in het engels)" name="country" rules={[{ required: true, message: 'Vul een land in' }]}>
            <Input />
        </Form.Item>
        </Form>
        </Modal>
        </div>
  )
}
export default CreateGame;
