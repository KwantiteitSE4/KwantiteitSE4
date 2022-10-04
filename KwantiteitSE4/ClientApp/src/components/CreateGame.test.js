const createGame = require('/CreateGame');

it('does nothing', async () => {
    expect(createGame.CreateGame()).toBe('');
});