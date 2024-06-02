import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
} from '../../utils/fetch';
import { fetchUser } from '../../redux/auth/actions';
import { setDetailThread, fetchGetThread } from '../../redux/threads/actions';

export default function VoteDetailThread() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.threads.detailThread);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetThread(id));
    dispatch(fetchUser());
  }, [id, dispatch]);

  const isUserUpvoted = () =>
    detailThread.upVotesBy && detailThread.upVotesBy.includes(user.id);

  const isUserDownvoted = () =>
    detailThread.downVotesBy && detailThread.downVotesBy.includes(user.id);

  const updateVotes = async (voteType) => {
    try {
      const updatedThread = { ...detailThread };

      if (voteType === 'up') {
        if (isUserUpvoted()) {
          updatedThread.upVotesBy = detailThread.upVotesBy.filter(
            (id) => id !== user.id
          );
          await neutralThreadVote(detailThread.id);
        } else {
          updatedThread.upVotesBy = [...detailThread.upVotesBy, user.id];
          if (isUserDownvoted()) {
            updatedThread.downVotesBy = detailThread.downVotesBy.filter(
              (id) => id !== user.id
            );
          }
          await upVoteThread(detailThread.id, 1);
        }
      } else if (voteType === 'down') {
        if (isUserDownvoted()) {
          updatedThread.downVotesBy = detailThread.downVotesBy.filter(
            (id) => id !== user.id
          );
          await neutralThreadVote(detailThread.id);
        } else {
          updatedThread.downVotesBy = [...detailThread.downVotesBy, user.id];
          if (isUserUpvoted()) {
            updatedThread.upVotesBy = detailThread.upVotesBy.filter(
              (id) => id !== user.id
            );
          }
          await downVoteThread(detailThread.id, -1);
        }
      }

      dispatch(setDetailThread(updatedThread));
    } catch (error) {
      console.error('Update Votes Error:', error);
    }
  };

  const handleUpvote = (e) => {
    e.preventDefault();
    updateVotes('up');
  };

  const handleDownvote = (e) => {
    e.preventDefault();
    updateVotes('down');
  };

  return (
    <>
      <button
        type="button"
        onClick={handleUpvote}
        className={isUserUpvoted() ? 'text-yellow-600' : ''}
      >
        <p>👍</p>
        <p>{detailThread.upVotesBy?.length}</p>
      </button>
      <button
        type="button"
        onClick={handleDownvote}
        className={isUserDownvoted() ? 'text-yellow-600' : ''}
      >
        <p>👎</p>
        <p>{detailThread.downVotesBy?.length}</p>
      </button>
    </>
  );
}
