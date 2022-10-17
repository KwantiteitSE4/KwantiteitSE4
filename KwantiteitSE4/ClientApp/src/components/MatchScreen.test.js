import { getTurnCount } from './MatchScreen'
import { CalculateScore, postScore } from '../redux/actions/setScore'
import { useEffect, dispatch } from 'react'
it('runs the test', async () => {
  expect(getTurnCount()).toBe(0);
});
it('score calculated', async () => {
  expect(CalculateScore(['T20'])).toBe(60);
});
