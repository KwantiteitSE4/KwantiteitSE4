import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './MatchScreen.css';
import { Space, Row, Col, Card, Button, Input, InputNumber } from 'antd';

const currentPlayer = 'speler1';
const turnCount = 0;

export const DisplayScoreThrown = () => {
  return 'D16';
}
export const getTurnCount = () => {
  return turnCount;
}
export const MatchScreen = () => {
  const [count, setCount] = useState(1);

  const incrementTurn = () => {
    setCount((c) => c + 1);
  };
  return (
    <Space>
      <Row gutter={[16, 16, 16, 16]}>
        <Col>
          <div className='current-turn-element'>
            <Card title={currentPlayer}>
              {count}
            </Card>
            <Input className='multiplier-input' placeholder='Enter S for Single, D for Double and T for Triple' type='text' maxLength='1'></Input>
            <InputNumber className='score-input' placeholder='score' type='text' maxLength='2'></InputNumber>
            <Button onClick={incrementTurn}>End Turn</Button>
            <Button onClick={DisplayScoreThrown}>Throw</Button>
          </div>
        </Col>
      </Row>
    </Space>
  )
}
