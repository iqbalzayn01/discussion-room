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
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  // test 1
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      threads: [],
      detailThread: {},
    };
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  // test 2
  it('should return the threads when given by setThreads action', () => {
    // Arrange
    const initialState = {
      threads: [],
      detailThread: {},
    };
    const action = {
      type: 'threads/setThreads',
      payload: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ],
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      threads: action.payload,
      detailThread: {},
    });
  });

  it('should add a thread when given by createThreads action', () => {
    const initialState = { threads: [], detailThread: {} };
    const newThread = {
      id: 'thread-3',
      title: 'Thread ketiga',
      body: 'Ini adalah thread ketiga',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-3',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: 'threads/createThreads',
      payload: newThread,
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual({
      threads: [newThread],
      detailThread: {},
    });
  });

  it('should add a comment to the detailThread when given by addComment action', () => {
    const initialState = {
      threads: [],
      detailThread: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
        comments: [],
      },
    };
    const newComment = {
      id: 'comment-1',
      threadId: 'thread-1',
      body: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:30:00.000Z',
      ownerId: 'users-2',
    };
    const action = {
      type: 'threads/addComment',
      payload: newComment,
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState.detailThread.comments).toEqual([newComment]);
  });
});
