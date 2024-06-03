import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged } from '../../redux/auth/actions';
import {
  upVoteThreadAction,
  downVoteThreadAction,
  neutralThreadVoteAction,
  setDetailThread,
} from '../../redux/threads/actions';

export default function VoteDetailThread() {
  const detailThread = useSelector((state) => state.threads.detailThread);
  const user = useSelector((state) => state.auth.user);
  const authUser = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    dispatch(userLogged());
  }, [authUser, dispatch]);

  const isUserUpvoted = () => detailThread.upVotesBy?.includes(user.id);
  const isUserDownvoted = () => detailThread.downVotesBy?.includes(user.id);

  const handleVote = async (voteType) => {
    if (!authUser || voting) return;

    try {
      setVoting(true);
      let updatedThread;
      if (voteType === 'up') {
        if (isUserUpvoted()) {
          await dispatch(neutralThreadVoteAction(detailThread.id));
          updatedThread = {
            ...detailThread,
            upVotesBy: detailThread.upVotesBy.filter((id) => id !== user.id),
          };
        } else {
          await dispatch(upVoteThreadAction(detailThread.id));
          updatedThread = {
            ...detailThread,
            upVotesBy: [...detailThread.upVotesBy, user.id],
          };
          if (isUserDownvoted()) {
            updatedThread.downVotesBy = detailThread.downVotesBy.filter(
              (id) => id !== user.id
            );
          }
        }
      } else if (voteType === 'down') {
        if (isUserDownvoted()) {
          await dispatch(neutralThreadVoteAction(detailThread.id));
          updatedThread = {
            ...detailThread,
            downVotesBy: detailThread.downVotesBy.filter(
              (id) => id !== user.id
            ),
          };
        } else {
          await dispatch(downVoteThreadAction(detailThread.id));
          updatedThread = {
            ...detailThread,
            downVotesBy: [...detailThread.downVotesBy, user.id],
          };
          if (isUserUpvoted()) {
            updatedThread.upVotesBy = detailThread.upVotesBy.filter(
              (id) => id !== user.id
            );
          }
        }
      }
      dispatch(setDetailThread(updatedThread));
    } catch (error) {
      console.error('Vote Error:', error);
    } finally {
      setVoting(false);
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
