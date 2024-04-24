import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getUserLogged,
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
} from '../../utils/fetch';
import { setOneUser } from '../../redux/auth/actions';
import { setThreads } from '../../redux/threads/actions';

export default function VoteThreads({ thread, handleVoteUpdate }) {
  const user = useSelector((state) => state.auth.user);
  const authUser = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authUser) return;
        const resUserLogged = await getUserLogged();
        const dataUser = resUserLogged.data.user;

        dispatch(setOneUser(dataUser));
      } catch (error) {
        console.error('Get One User Error:', error);
      }
    };

    fetchData();
  }, [authUser, dispatch]);

  const isUserUpvoted = (userId) =>
    thread.upVotesBy && thread.upVotesBy.includes(userId);

  const isUserDownvoted = (userId) =>
    thread.downVotesBy && thread.downVotesBy.includes(userId);

  const updateVotes = (userId, voteType) => {
    const updatedThread = { ...thread };

    if (voteType === 'up') {
      updatedThread.upVotesBy = isUserUpvoted(userId)
        ? thread.upVotesBy.filter((id) => id !== userId)
        : [...thread.upVotesBy, userId];

      if (isUserDownvoted(userId)) {
        updatedThread.downVotesBy = thread.downVotesBy.filter(
          (id) => id !== userId
        );
      }
    } else if (voteType === 'down') {
      updatedThread.downVotesBy = isUserDownvoted(userId)
        ? thread.downVotesBy.filter((id) => id !== userId)
        : [...thread.downVotesBy, userId];

      if (isUserUpvoted(userId)) {
        updatedThread.upVotesBy = thread.upVotesBy.filter(
          (id) => id !== userId
        );
      }
    }

    return updatedThread;
  };

  const handleUpvote = async (e) => {
    e.preventDefault();

    try {
      if (!authUser) return navigate('/signin');
      if (isUserUpvoted(user?.id)) {
        await neutralThreadVote(thread.id);
      } else {
        await upVoteThread(thread.id, 1);
      }

      const updatedThread = updateVotes(user?.id, 'up');
      const updatedThreads = handleVoteUpdate(updatedThread);
      dispatch(setThreads(updatedThreads));
    } catch (error) {
      console.error('Upvote Error:', error);
    }
  };

  const handleDownvote = async (e) => {
    e.preventDefault();

    try {
      if (!authUser) return navigate('/signin');
      if (isUserDownvoted(user?.id)) {
        await neutralThreadVote(thread.id);
      } else {
        await downVoteThread(thread.id, -1);
      }

      const updatedThread = updateVotes(user?.id, 'down');
      const updatedThreads = handleVoteUpdate(updatedThread);
      dispatch(setThreads(updatedThreads));
    } catch (error) {
      console.error('Downvote Error:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleUpvote}
        className={isUserUpvoted(user?.id) ? 'text-yellow-600' : ''}
      >
        <p>{`👍 ${thread.upVotesBy?.length}`}</p>
      </button>
      <button
        type="button"
        onClick={handleDownvote}
        className={isUserDownvoted(user?.id) ? 'text-yellow-600' : ''}
      >
        <p>{`👎 ${thread.downVotesBy?.length}`}</p>
      </button>
    </>
  );
}

VoteThreads.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
  }),
  handleVoteUpdate: PropTypes.func,
};
