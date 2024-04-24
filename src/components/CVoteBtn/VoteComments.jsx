import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getUserLogged,
  getThread,
  upVoteComment,
  downVoteComment,
  neutralCommentVote,
} from '../../utils/fetch';
import { setOneUser } from '../../redux/auth/actions';
import { setDetailThread } from '../../redux/threads/actions';

export default function VoteComments({ comment }) {
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
    comment.upVotesBy && comment.upVotesBy.includes(user.id);

  const isUserDownvoted = () =>
    comment.downVotesBy && comment.downVotesBy.includes(user.id);

  const updateVotes = async (voteType) => {
    try {
      const updatedComment = { ...comment };

      if (voteType === 'up') {
        updatedComment.upVotesBy = isUserUpvoted()
          ? comment.upVotesBy.filter((id) => id !== user.id)
          : [...comment.upVotesBy, user.id];

        if (isUserDownvoted()) {
          updatedComment.downVotesBy = comment.downVotesBy.filter(
            (id) => id !== user.id
          );
        }

        await upVoteComment(id, comment.id);
      } else if (voteType === 'down') {
        updatedComment.downVotesBy = isUserDownvoted()
          ? comment.downVotesBy.filter((id) => id !== user.id)
          : [...comment.downVotesBy, user.id];

        if (isUserUpvoted()) {
          updatedComment.upVotesBy = comment.upVotesBy.filter(
            (id) => id !== user.id
          );
        }

        await downVoteComment(id, comment.id);
      } else if (voteType === 'neutral') {
        updatedComment.upVotesBy = comment.upVotesBy.filter(
          (id) => id !== user.id
        );
        updatedComment.downVotesBy = comment.downVotesBy.filter(
          (id) => id !== user.id
        );

        await neutralCommentVote(id, comment.id);
      }

      dispatch(
        setDetailThread({
          ...detailThread,
          comments: detailThread.comments.map((c) =>
            c.id === comment.id ? updatedComment : c
          ),
        })
      );
    } catch (error) {
      console.error('Update Votes Error:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => updateVotes('up')}
        className={isUserUpvoted() ? 'text-yellow-600' : ''}
      >
        {`👍 ${comment.upVotesBy?.length}`}
      </button>
      <button
        type="button"
        onClick={() => updateVotes('down')}
        className={isUserDownvoted() ? 'text-yellow-600' : ''}
      >
        {`👎 ${comment.downVotesBy?.length}`}
      </button>
    </>
  );
}

VoteComments.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
  }),
};
