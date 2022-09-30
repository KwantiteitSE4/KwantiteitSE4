import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Main } from './components/Main';
import { PlayerOverview } from './components/PlayerOverview';
import { PlayerEditor } from './components/PlayerEditor';
import { MatchOverview } from './components/MatchOverview';
import { MatchEditor } from './components/MatchEditor';
import { CreateGame } from './components/CreateGame';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Main} />
        <Route path='/PlayerOverview' component={PlayerOverview} />
        <Route path='/PlayerEditor' component={PlayerEditor} />
        <Route path='/MatchOverview' component={MatchOverview} />
        <Route path='/MatchEditor' component={MatchEditor} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/CreateGame' component={CreateGame} />
      </Layout>
    );
  }
}
