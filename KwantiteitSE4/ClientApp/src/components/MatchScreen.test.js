import { getTurnCount, DisplayScoreThrown, CalculateScore } from './MatchScreen'

it('runs the test', async () => {
  expect(getTurnCount()).toBe(0);
});
it('score calculated', async () => {
  expect(CalculateScore('T20')).toBe(60);
});
