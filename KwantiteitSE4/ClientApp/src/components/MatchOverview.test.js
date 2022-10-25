import { searchFilter } from './MatchOverview'

const mockGames = [
  {
    gameID: 1,
    player1ID: 1,
    player1: {
      playerID: 1,
      name: 'Nick de Boer',
      country: 'NL'
    },
    player2ID: 2,
    player2: {
      playerID: 2,
      name: 'Patrick Norden',
      country: 'GB'
    },
    winnerID: 1,
    winner: {
      playerID: 1,
      name: 'Nick de Boer',
      country: 'NL'
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
      country: 'US'
    },
    player2ID: 4,
    player2: {
      playerID: 4,
      name: 'Alexander de Haan',
      country: 'SE'
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
      country: 'GB'
    },
    player2ID: 10,
    player2: {
      playerID: 10,
      name: 'van Gerwen',
      country: 'NL'
    },
    winnerID: 10,
    winner: {
      playerID: 10,
      name: 'van Gerwen',
      country: 'NL'
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
      country: 'NL'
    },
    player2ID: 2,
    player2: {
      playerID: 2,
      name: 'Patrick Norden',
      country: 'GB'
    },
    winnerID: null,
    winner: null,
    numberOfSets: 1,
    numberOfLegs: 3,
    gameDateTime: '2022-10-25T10:24:04.194615',
    sets: null
  }
];

it('correct winner search', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('Nick', mockGames, 'Winner')
  expect(searchTerm).toEqual('Nick')
  expect(toBeDisplayed).toEqual([
    {
      gameID: 1,
      player1ID: 1,
      player1: {
        playerID: 1,
        name: 'Nick de Boer',
        country: 'NL'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'GB'
      },
      winnerID: 1,
      winner: {
        playerID: 1,
        name: 'Nick de Boer',
        country: 'NL'
      },
      numberOfSets: 1,
      numberOfLegs: 1,
      gameDateTime: '2022-10-25T10:24:04.1910679',
      sets: null
    }
  ]);
});
it('correct no winner search', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('no winner', mockGames, 'Winner')
  expect(searchTerm).toEqual('no winner')
  expect(toBeDisplayed).toEqual([
    {
      gameID: 2,
      player1ID: 3,
      player1: {
        playerID: 3,
        name: 'Musaab Azawi',
        country: 'US'
      },
      player2ID: 4,
      player2: {
        playerID: 4,
        name: 'Alexander de Haan',
        country: 'SE'
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
        country: 'NL'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'GB'
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
it('correct players search', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('kobus', mockGames, 'Players')
  expect(searchTerm).toEqual('kobus')
  expect(toBeDisplayed).toEqual([
    {
      gameID: 4,
      player1ID: 5,
      player1: {
        playerID: 5,
        name: 'Kobus Hettinga',
        country: 'NL'
      },
      player2ID: 2,
      player2: {
        playerID: 2,
        name: 'Patrick Norden',
        country: 'GB'
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
it('correct nothing filter', async () => {
  const [toBeDisplayed, searchTerm] = searchFilter('', mockGames, 'Nothing')
  expect(searchTerm).toEqual('')
  expect(toBeDisplayed).toEqual(mockGames);
});
