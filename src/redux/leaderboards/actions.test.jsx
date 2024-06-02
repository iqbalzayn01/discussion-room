/**
 * test scenario for fetchAllThreads
 *
 * - fetchAllThreads function
 *  - should dispatch setLeaderboards with the data from getLeaderboards
 *  - should handle errors correctly
 *
 */

import { describe, it, expect, vi } from 'vitest';
import { leaderBoards, setLeaderboards } from './actions';
import { getLeaderboards } from '../../utils/fetch';

vi.mock('../../utils/fetch', () => ({
  getLeaderboards: vi.fn(),
}));

describe('fetchLeaderboards thunk', () => {
  it('should dispatch setLeaderboards with the data from getLeaderboards', async () => {
    const mockLeaderboards = [
      { id: 1, name: 'User 1', score: 100 },
      { id: 2, name: 'User 2', score: 90 },
    ];

    // Mock the getLeaderboards response
    getLeaderboards.mockResolvedValue({
      data: { leaderboards: mockLeaderboards },
    });

    const dispatch = vi.fn();

    // Call the thunk
    await leaderBoards()(dispatch);

    // Verify that setLeaderboards was dispatched with the correct data
    expect(dispatch).toHaveBeenCalledWith(setLeaderboards(mockLeaderboards));
  });

  it('should handle errors correctly', async () => {
    // Mock the getLeaderboards to throw an error
    getLeaderboards.mockRejectedValue(new Error('Network Error'));

    const dispatch = vi.fn();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Call the thunk
    await leaderBoards()(dispatch);

    // Verify that the error was logged
    expect(consoleError).toHaveBeenCalledWith(
      'Get Leaderboards Error:',
      expect.any(Error)
    );

    // Restore console error
    consoleError.mockRestore();
  });
});
