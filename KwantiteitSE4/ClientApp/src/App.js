import React from 'react';
import { Redirect, BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path='/' element={<Main/>} />
              <Route path='PlayerOverview' element={<PlayerOverview/>} />
              <Route path='PlayerEditor' element={<PlayerEditor/>}
				{currentPlayer.playerID ? <PlayerEditor /> : <Redirect to={'/PlayerOverview'}  />
              <Route path='MatchOverview' element={<MatchOverview/>} />
              <Route path='MatchEditor' element={<MatchEditor/>}
				{gameLoader ? <MatchEditor /> : <Redirect to={'/MatchOverview'} />
              <Route path='CreateGame' element={<CreateGame/>} />
              <Route path='MatchScreen' element={<MatchScreen/>} />
            </Routes>
            </Layout>
          </BrowserRouter>
  )
};

export default (App);
