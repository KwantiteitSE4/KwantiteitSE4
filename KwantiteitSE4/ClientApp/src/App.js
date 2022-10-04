import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Main } from './components/Main';
import { PlayerOverview } from './components/PlayerOverview';
import { PlayerEditor } from './components/PlayerEditor';
import { MatchOverview } from './components/MatchOverview';
import { MatchEditor } from './components/MatchEditor';
import { CreateGame } from './components/CreateGame';

const App = () => {
  return (
      <Layout>
        <Route exact path='/' component={Main} />
        <Route path='/PlayerOverview' component={PlayerOverview} />
        <Route path='/PlayerEditor' component={PlayerEditor} />
        <Route path='/MatchOverview' component={MatchOverview} />
        <Route path='/MatchEditor' component={MatchEditor} />
        <Route path='/CreateGame' component={CreateGame} />
      </Layout>
  )
};

export default (App);
