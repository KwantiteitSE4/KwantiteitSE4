import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Main } from './components/Main';
import { PlayerOverview } from './components/PlayerOverview';
import { PlayerEditor } from './components/PlayerEditor';
import { MatchOverview } from './components/MatchOverview';
import { MatchEditor } from './components/MatchEditor';
import { CreateGame } from './components/CreateGame';
import { MatchScreen } from './components/MatchScreen';

// TODO Redirect to overview if reloaded in an editor, early version we made of this broke on updating react

const App = () => {
  return (
          <BrowserRouter>
          <Layout>
            <Routes>
              <Route exact path='/' element={<Main/>} />
              <Route path='PlayerOverview' element={<PlayerOverview/>} />
              <Route path='PlayerEditor' element={<PlayerEditor/>} />
              <Route path='MatchOverview' element={<MatchOverview/>} />
              <Route path='MatchEditor' element={<MatchEditor/>} />
              <Route path='CreateGame' element={<CreateGame/>} />
              <Route path='MatchScreen' element={<MatchScreen/>} />
            </Routes>
            </Layout>
          </BrowserRouter>
  )
};

export default (App);
