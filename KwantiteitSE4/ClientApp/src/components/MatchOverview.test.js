import { searchFilter } from './MatchOverview'
const mockGames = [
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
  },
  {
    gameID: 2,
    player1ID: 3,
    player1: {
      playerID: 3,
      name: 'Musaab Azawi',
      country: 'United States'
    },
    player2ID: 4,
    player2: {
      playerID: 4,
      name: 'Alexander de Haan',
      country: 'Sweden'
    },
    winnerID: null,
    winner: null,
    numberOfSets: 5,
    numberOfLegs: 3,
    gameDateTime: '2022-10-25T10:24:04.194612',
    sets: null
  },
  {
    gameID: 3,
    player1ID: 11,
    player1: {
      playerID: 11,
      name: 'Aspinall',
      country: 'Great Britain'
    },
    player2ID: 10,
    player2: {
      playerID: 10,
      name: 'van Gerwen',
      country: 'Netherlands'
    },
    winnerID: 10,
    winner: {
      playerID: 10,
      name: 'van Gerwen',
      country: 'Netherlands'
    },
    numberOfSets: 8,
    numberOfLegs: 5,
    gameDateTime: '2022-10-25T10:24:04.1946145',
    sets: null
  },
  {
    gameID: 4,
    player1ID: 5,
    player1: {
      playerID: 5,
      name: 'Kobus Hettinga',
      country: 'Netherlands'
    },
    player2ID: 2,
    player2: {
      playerID: 2,
      name: 'Patrick Norden',
      country: 'Great Britain'
    },
    winnerID: null,
    winner: null,
    numberOfSets: 1,
    numberOfLegs: 3,
    gameDateTime: '2022-10-25T10:24:04.194615',
    sets: null
  }
];

it('Correctly Filter based on Winner', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('Nick', mockGames, 'Winner')
  expect(searchTerm).toEqual('Nick')
  expect(toBeDisplayed).toEqual([
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
it('Correctly Filter in case of No Winner', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('no winner', mockGames, 'Winner')
  expect(searchTerm).toEqual('no winner')
  expect(toBeDisplayed).toEqual([
    {
      gameID: 2,
      player1ID: 3,
      player1: {
        playerID: 3,
        name: 'Musaab Azawi',
        country: 'United States'
      },
      player2ID: 4,
      player2: {
        playerID: 4,
        name: 'Alexander de Haan',
        country: 'Sweden'
      },
      winnerID: null,
      winner: null,
      numberOfSets: 5,
      numberOfLegs: 3,
      gameDateTime: '2022-10-25T10:24:04.194612',
      sets: null
    },
    {
      gameID: 4,
      player1ID: 5,
      player1: {
        playerID: 5,
        name: 'Kobus Hettinga',
        country: 'Netherlands'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'Great Britain'
      },
      winnerID: null,
      winner: null,
      numberOfSets: 1,
      numberOfLegs: 3,
      gameDateTime: '2022-10-25T10:24:04.194615',
      sets: null
    }
  ]);
});
it('Correctly Filter based on Player', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('kobus', mockGames, 'Players')
  expect(searchTerm).toEqual('kobus')
  expect(toBeDisplayed).toEqual([
    {
      gameID: 4,
      player1ID: 5,
      player1: {
        playerID: 5,
        name: 'Kobus Hettinga',
        country: 'Netherlands'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'Great Britain'
      },
      winnerID: null,
      winner: null,
      numberOfSets: 1,
      numberOfLegs: 3,
      gameDateTime: '2022-10-25T10:24:04.194615',
      sets: null
    }
  ]);
});
it('Correctly filter if nothing is selected', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('', mockGames, 'Nothing')
  expect(searchTerm).toEqual('')
  expect(toBeDisplayed).toEqual(mockGames);
});
