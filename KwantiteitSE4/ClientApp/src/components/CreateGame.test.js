import { postNewGame } from '../redux/actions/postGame';
describe('Create game and return game id', () => {
  it('should create a game and return the game id', async () => {
    const testObject = {
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
      numberOfSets: 3,
      numberOfLegs: 3,
      gameDateTime: '2022-10-18T14:25:02.0447046',
      startPlayerID: 1
    };
    const game = postNewGame(testObject);
    expect(game).not.toBeNull();
    expect(game.id).not.toBeNull();
    expect(console.log(game));
  }, 10000);
});
