const matchScreen = require('./MatchScreen');

it('runs the test', async () => {
  expect(matchScreen.getTurnCount()).toBe(0);
});
it('A dart is thrown', async () => {
  expect(matchScreen.DisplayScoreThrown()).toBe('D16');
});