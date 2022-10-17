import { getTurnCount, DisplayScoreThrown } from './MatchScreen'

it('runs the test', async () => {
  expect(getTurnCount()).toBe(0);
});
it('A dart is thrown', async () => {
  expect(DisplayScoreThrown()).toBe('D16');
});
