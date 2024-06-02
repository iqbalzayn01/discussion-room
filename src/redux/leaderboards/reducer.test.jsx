/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by setThreads action
 *  - should add a thread when given by createThreads action
 *  - should add a comment to the detailThread when given by addComment action
 *
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  // test 1
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      leaderboards: [],
    };
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  // test 2
  it('should return the leaderboards when given by setLeaderboards action', () => {
    const initialState = {
      leaderboards: [],
    };
    const action = {
      type: 'leaderboards/setLeaderboards',
      payload: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
        {
          user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 5,
        },
      ],
    };

    // Action
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      leaderboards: action.payload,
    });
  });
});
