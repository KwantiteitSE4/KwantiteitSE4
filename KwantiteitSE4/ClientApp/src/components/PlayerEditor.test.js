import { searchFilter } from './PlayerEditor'
const mockGames = [{
  gameID: 1,
  player1ID: 1,
  player1: {
    playerID: 1,
    name: 'Nick de Boer',
    country: 'Netherlands'
  },
  player2ID: 2,
  player2: {
    playerID: 2,
    name: 'Patrick Norden',
    country: 'Great Britain'
  },
  winnerID: 1,
  winner: {
    playerID: 1,
    name: 'Nick de Boer',
    country: 'Netherlands'
  },
  numberOfSets: 1,
  numberOfLegs: 1,
  gameDateTime: '2022-10-25T10:24:04.1910679',
  sets: null
},
{
  gameID: 4,
  player1ID: 1,
  player1: {
    playerID: 1,
    name: 'Nick de Boer',
    country: 'Netherlands'
  },
  player2ID: 6,
  player2: {
    playerID: 6,
    name: 'Frank Stekelenburg',
    country: 'Great Britain'
  },
  winnerID: 6,
  winner: {
    playerID: 6,
    name: 'Frank Stekelenburg',
    country: 'Great Britain'
  },
  numberOfSets: 1,
  numberOfLegs: 3,
  gameDateTime: '2022-10-25T10:24:04.194615',
  sets: null
}];

it('Correctly Filter based on Winner', async () => {
  expect(searchFilter('Frank', mockGames, 'Winner')).toEqual([
    {
      gameID: 4,
      player1ID: 1,
      player1: {
        playerID: 1,
        name: 'Nick de Boer',
        country: 'Netherlands'
      },
      player2ID: 6,
      player2: {
        playerID: 6,
        name: 'Frank Stekelenburg',
        country: 'Great Britain'
      },
      winnerID: 6,
      winner: {
        playerID: 6,
        name: 'Frank Stekelenburg',
        country: 'Great Britain'
      },
      numberOfSets: 1,
      numberOfLegs: 3,
      gameDateTime: '2022-10-25T10:24:04.194615',
      sets: null
    }
  ]);
});

it('Correctly Filter based on Player', async () => {
  expect(searchFilter('Patrick', mockGames, 'Player')).toEqual([
    {
      gameID: 1,
      player1ID: 1,
      player1: {
        playerID: 1,
        name: 'Nick de Boer',
        country: 'Netherlands'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'Great Britain'
      },
      winnerID: 1,
      winner: {
        playerID: 1,
        name: 'Nick de Boer',
        country: 'Netherlands'
      },
      numberOfSets: 1,
      numberOfLegs: 1,
      gameDateTime: '2022-10-25T10:24:04.1910679',
      sets: null
    }
  ]);
});
