/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { createAction } from '@reduxjs/toolkit';

import {
  getAllThreads,
  getThread,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralCommentVote,
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
} from '../../utils/fetch';

export const setThreads = createAction('threads/setThreads');
export const setDetailThread = createAction('threads/setDetailThread');
export const createThreads = createAction('threads/createThreads');
export const addComment = createAction('threads/addComment');

export const allThreads = () => async (dispatch) => {
  try {
    const res = await getAllThreads();
    const dataThreads = res.data.threads;
    dispatch(setThreads(dataThreads));
  } catch (error) {
    console.error('Get All Threads Error:', error);
  }
};

export const getOneThread = (id) => async (dispatch) => {
  try {
    const res = await getThread(id);
    const dataThread = res.data.detailThread;

    dispatch(setDetailThread(dataThread));
  } catch (error) {
    console.error('Get One Thread Error:', error);
  }
};

export const createComments = (id, content) => async (dispatch) => {
  try {
    const res = await createComment(id, content);
    const { comment } = res.data;

    dispatch(addComment(comment));
  } catch (error) {
    console.error('Create Comment Error:', error);
  }
};

export const upVoteCommentAction =
  (threadId, commentId) => async (dispatch, getState) => {
    try {
      await upVoteComment(threadId, commentId);
      const { detailThread } = getState().threads;
      const updatedComments = detailThread.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(getState().auth.user.id)
                ? comment.upVotesBy.filter(
                    (id) => id !== getState().auth.user.id
                  )
                : [...comment.upVotesBy, getState().auth.user.id],
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
            }
          : comment
      );
      dispatch(setDetailThread({ ...detailThread, comments: updatedComments }));
    } catch (error) {
      console.error('Upvote Comment Error:', error);
    }
  };

export const downVoteCommentAction =
  (threadId, commentId) => async (dispatch, getState) => {
    try {
      await downVoteComment(threadId, commentId);
      const { detailThread } = getState().threads;
      const updatedComments = detailThread.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(getState().auth.user.id)
                ? comment.downVotesBy.filter(
                    (id) => id !== getState().auth.user.id
                  )
                : [...comment.downVotesBy, getState().auth.user.id],
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
            }
          : comment
      );
      dispatch(setDetailThread({ ...detailThread, comments: updatedComments }));
    } catch (error) {
      console.error('Downvote Comment Error:', error);
    }
  };

export const neutralCommentVoteAction =
  (threadId, commentId) => async (dispatch, getState) => {
    try {
      await neutralCommentVote(threadId, commentId);
      const { detailThread } = getState().threads;
      const updatedComments = detailThread.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
            }
          : comment
      );
      dispatch(setDetailThread({ ...detailThread, comments: updatedComments }));
    } catch (error) {
      console.error('Neutral Comment Vote Error:', error);
    }
  };

export const upVoteThreadAction = (threadId) => async (dispatch, getState) => {
  try {
    await upVoteThread(threadId);
    const { threads } = getState().threads;
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(getState().auth.user.id)
              ? thread.upVotesBy.filter((id) => id !== getState().auth.user.id)
              : [...thread.upVotesBy, getState().auth.user.id],
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== getState().auth.user.id
            ),
          }
        : thread
    );
    dispatch(setThreads(updatedThreads));
  } catch (error) {
    console.error('Upvote Thread Error:', error);
  }
};

export const downVoteThreadAction =
  (threadId) => async (dispatch, getState) => {
    try {
      await downVoteThread(threadId);
      const { threads } = getState().threads;
      const updatedThreads = threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              downVotesBy: thread.downVotesBy.includes(getState().auth.user.id)
                ? thread.downVotesBy.filter(
                    (id) => id !== getState().auth.user.id
                  )
                : [...thread.downVotesBy, getState().auth.user.id],
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
            }
          : thread
      );
      dispatch(setThreads(updatedThreads));
    } catch (error) {
      console.error('Downvote Thread Error:', error);
    }
  };

export const neutralThreadVoteAction =
  (threadId) => async (dispatch, getState) => {
    try {
      await neutralThreadVote(threadId);
      const { threads } = getState().threads;
      const updatedThreads = threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
              downVotesBy: thread.downVotesBy.filter(
                (id) => id !== getState().auth.user.id
              ),
            }
          : thread
      );
      dispatch(setThreads(updatedThreads));
    } catch (error) {
      console.error('Neutral Thread Vote Error:', error);
    }
  };
