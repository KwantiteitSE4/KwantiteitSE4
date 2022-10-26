import { searchFilter } from './PlayerOverview'
it('Correctly Search Players', async () => {
  const mockPlayers = [
    {
      playerID: 1,
      name: 'Nick de Boer'
    },
    {
      playerID: 2,
      name: 'Patrick Norden'
    },
    {
      playerID: 3,
      name: 'Musaab Azawi'
    },
    {
      playerID: 4,
      name: 'Alexander de Haan'
    },
    {
      playerID: 5,
      name: 'Frank Stekelenburg'
    },
    {
      playerID: 6,
      name: 'Kobus Hettinga'
    },
    {
      playerID: 7,
      name: 'Jan Minne Holwerda'
    },
    {
      playerID: 8,
      name: 'Jasper Steenhuis'
    }
  ];

  expect(searchFilter('kobus', mockPlayers)).toEqual([
    {
      playerID: 6,
      name: 'Kobus Hettinga'
    }
  ]);
});
