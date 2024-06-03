import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogged } from '../../redux/auth/actions';
import {
  upVoteThreadAction,
  downVoteThreadAction,
  neutralThreadVoteAction,
} from '../../redux/threads/actions';

export default function VoteThreads({ thread }) {
  const user = useSelector((state) => state.auth.user);
  const authUser = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogged());
  }, [authUser, dispatch]);

  const isUserUpvoted = (userId) =>
    thread.upVotesBy && thread.upVotesBy.includes(userId);

  const isUserDownvoted = (userId) =>
    thread.downVotesBy && thread.downVotesBy.includes(userId);

  const handleVote = async (voteType) => {
    if (!authUser) {
      return navigate('/signin');
    }

    try {
      if (voteType === 'up') {
        if (isUserUpvoted(user.id)) {
          await dispatch(neutralThreadVoteAction(thread.id));
        } else {
          await dispatch(upVoteThreadAction(thread.id));
        }
      } else if (voteType === 'down') {
        if (isUserDownvoted(user.id)) {
          await dispatch(neutralThreadVoteAction(thread.id));
        } else {
          await dispatch(downVoteThreadAction(thread.id));
        }
      }
    } catch (error) {
      console.error('Vote Error:', error);
    }
  };

  const handleUpvote = (e) => {
    e.preventDefault();
    handleVote('up');
  };

  const handleDownvote = (e) => {
    e.preventDefault();
    handleVote('down');
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
};
