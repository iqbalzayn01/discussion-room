/**
 * test scenario for fetchAllThreads
 *
 * - fetchAllThreads function
 *  - should dispatch setThreads with the data from getAllThreads
 *  - should handle errors correctly
 *
 */

import { describe, it, expect, vi } from 'vitest';
import { allThreads, setThreads } from './actions';
import { getAllThreads } from '../../utils/fetch';

vi.mock('../../utils/fetch', () => ({
  getAllThreads: vi.fn(),
}));

describe('fetchAllThreads thunk', () => {
  it('should dispatch setThreads with the data from getAllThreads', async () => {
    const mockThreads = [
      { id: 1, title: 'Thread 1' },
      { id: 2, title: 'Thread 2' },
    ];

    getAllThreads.mockResolvedValue({
      data: { threads: mockThreads },
    });

    const dispatch = vi.fn();

    await allThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setThreads(mockThreads));
  });

  it('should handle errors correctly', async () => {
    getAllThreads.mockRejectedValue(new Error('Network Error'));

    const dispatch = vi.fn();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await allThreads()(dispatch);

    expect(consoleError).toHaveBeenCalledWith(
      'Get All Threads Error:',
      expect.any(Error)
    );

    consoleError.mockRestore();
  });
});
