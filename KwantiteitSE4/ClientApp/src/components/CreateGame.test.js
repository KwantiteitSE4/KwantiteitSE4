import postNewGame from './CreateGame'
describe('Create game and return game id', () => {
  it('should create a game and return the game id', async () => {
    let game = await postNewGame();
    expect(game).not.toBeNull();
    expect(game.id).not.toBeNull();
  }, 10000);
});
