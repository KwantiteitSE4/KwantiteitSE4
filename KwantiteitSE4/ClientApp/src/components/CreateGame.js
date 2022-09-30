import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker, Space, Card, Input, Select, Image, Row, Col } from 'antd';

const { Option } = Select;

const legs = [];
const sets = [];

for (let i = 1; i < 22; i++) {
  legs.push(<Option key={i}>{i}</Option>);
}
for (let i = 1; i < 14; i++) {
  sets.push(<Option key={i}>{i}</Option>);
}

export class CreateGame extends Component {
  render() {
    return (
      <Space>
        <Row gutter={[16, 16, 16, 16]}>
          <Col className='gutter-row' span={7}>
            <div className='player1'>
              <Card title="Speler 1">
                <Image className='player-portrait' src="https://dartfreakz.nl/wp-content/uploads/2021/07/WLDMTCHPLAY-RD1-VANGERWEN37A-768x511.jpg" /><br></br>
                <Input className='player-name-input' placeholder="Voer naam in van speler 1" />
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
}
export default CreateGame;
