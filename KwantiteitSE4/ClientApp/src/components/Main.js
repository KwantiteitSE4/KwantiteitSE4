import React, { Component } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Main.css';

export class Main extends Component {
  static displayName = Main.name;

  render () {
    return (
      <div className='main'>
        <img className='main__logo' src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/4572.png" />
        <div className='main__menu'>
          <Link className='main__option' to='/CreateGame'>
            <Button type='default'>
              Create game
            </Button>
          </Link>
          <Link className='main__option' to='/PlayerOverview'>
            <Button type='default'>
              Player overview
            </Button>
          </Link>
          <Link className='main__option' to='/MatchOverview'>
            <Button type='default'>
              Match overview
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
