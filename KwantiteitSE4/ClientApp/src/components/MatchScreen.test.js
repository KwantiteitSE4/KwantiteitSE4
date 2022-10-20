import { getTurnCount } from './MatchScreen'
import { validateScoreInput } from '../redux/actions/setScore'
it('runs the test', async () => {
  expect(getTurnCount()).toBe(0);
});
it('score calculated', async () => {
  const testObject = {
    gameID: 4,
    player1ID: 1,
    player1: {
      playerID: 1,
      name: 'Nick de Boer'
    },
    player2ID: 2,
    player2: {
      playerID: 2,
      name: 'Patrick Norden'
    },
    winnerID: null,
    winner: null,
    numberOfSets: 1,
    numberOfLegs: 3,
    gameDateTime: '2022-10-18T14:25:02.0447046',
    sets: [
      {
        setID: 11,
        gameID: 4,
        game: null,
        winnerID: null,
        winner: null,
        legs: [
          {
            legID: 39,
            setID: 11,
            set: null,
            startPlayerID: 1,
            startPlayer: {
              playerID: 1,
              name: 'Nick de Boer'
            },
            winnerID: null,
            winner: null,
            turns: [
              {
                turnID: 44,
                legID: 39,
                leg: null,
                playerID: 1,
                player: {
                  playerID: 1,
                  name: 'Nick de Boer'
                },
                endScore: 441,
                throws: [
                  {
                    throwID: 129,
                    turnID: 44,
                    turn: null,
                    multiplier: 'S',
                    throwScore: 20
                  },
                  {
                    throwID: 130,
                    turnID: 44,
                    turn: null,
                    multiplier: 'S',
                    throwScore: 20
                  },
                  {
                    throwID: 131,
                    turnID: 44,
                    turn: null,
                    multiplier: 'S',
                    throwScore: 20
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  expect(validateScoreInput(['T20'], testObject)).toEqual([60, 381]);
});
