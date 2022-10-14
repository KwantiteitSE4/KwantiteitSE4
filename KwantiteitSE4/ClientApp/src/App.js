import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Main } from './components/Main';
import { PlayerOverview } from './components/PlayerOverview';
import { PlayerEditor } from './components/PlayerEditor';
import { MatchOverview } from './components/MatchOverview';
import { MatchEditor } from './components/MatchEditor';
import { CreateGame } from './components/CreateGame';
import { MatchScreen } from './components/MatchScreen';
import { useSelector } from 'react-redux';

const App = () => {
  const storePlayers = useSelector((state) => state.players);
  const storeMatches = useSelector((state) => state.games);
  const currentPlayer = storePlayers.currentPlayer;
  const gameLoader = storeMatches.gameLoader;

  return (
      <Layout>
        <Route exact path='/' component={Main} />
        <Route path='/PlayerOverview' component={PlayerOverview} />
        <Route path='/PlayerEditor'>
          {currentPlayer.playerID ? <PlayerEditor /> : <Redirect to={'/PlayerOverview'} />}
        </Route>
        <Route path='/MatchOverview' component={MatchOverview} />
        <Route path='/MatchEditor'>
          {gameLoader ? <MatchEditor /> : <Redirect to={'/MatchOverview'} />}
        </Route>
        <Route path='/CreateGame' component={CreateGame} />
        <Route path='/MatchScreen' component={MatchScreen} />
      </Layout>
  )
};

export default (App);
