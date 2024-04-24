import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  getUserLogged,
  getThread,
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
} from '../../utils/fetch';
import { setOneUser } from '../../redux/auth/actions';
import { setDetailThread } from '../../redux/threads/actions';

export default function VoteDetailThread() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.threads.detailThread);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getThread(id);
        const dataThread = res.data.detailThread;

        const resUserLogged = await getUserLogged();
        const dataUser = resUserLogged.data.user;

        dispatch(setDetailThread(dataThread));
        dispatch(setOneUser(dataUser));
      } catch (error) {
        console.error('Get One Thread Error:', error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const isUserUpvoted = () =>
    detailThread.upVotesBy && detailThread.upVotesBy.includes(user.id);

  const isUserDownvoted = () =>
    detailThread.downVotesBy && detailThread.downVotesBy.includes(user.id);

  const updateVotes = async (voteType) => {
    try {
      const updatedThread = { ...detailThread };

      if (voteType === 'up') {
        updatedThread.upVotesBy = isUserUpvoted()
          ? detailThread.upVotesBy.filter((id) => id !== user.id)
          : [...detailThread.upVotesBy, user.id];

        if (isUserDownvoted()) {
          updatedThread.downVotesBy = detailThread.downVotesBy.filter(
            (id) => id !== user.id
          );
        }

        await upVoteThread(detailThread.id, 1);
      } else if (voteType === 'down') {
        updatedThread.downVotesBy = isUserDownvoted()
          ? detailThread.downVotesBy.filter((id) => id !== user.id)
          : [...detailThread.downVotesBy, user.id];

        if (isUserUpvoted()) {
          updatedThread.upVotesBy = detailThread.upVotesBy.filter(
            (id) => id !== user.id
          );
        }

        await downVoteThread(detailThread.id, -1);
      }

      dispatch(setDetailThread(updatedThread));
    } catch (error) {
      console.error('Update Votes Error:', error);
    }
  };

  const handleUpvote = async (e) => {
    e.preventDefault();

    try {
      if (isUserUpvoted()) {
        await neutralThreadVote(detailThread.id);
      } else {
        await upVoteThread(detailThread.id, 1);
      }

      updateVotes('up');
    } catch (error) {
      console.error('Upvote Error:', error);
    }
  };

  const handleDownvote = async (e) => {
    e.preventDefault();

    try {
      if (isUserDownvoted()) {
        await neutralThreadVote(detailThread.id);
      } else {
        await downVoteThread(detailThread.id, -1);
      }

      updateVotes('down');
    } catch (error) {
      console.error('Downvote Error:', error);
    }
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
