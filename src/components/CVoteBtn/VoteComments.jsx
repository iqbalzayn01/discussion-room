import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogged } from '../../redux/auth/actions';
import {
  getOneThread,
  upVoteCommentAction,
  downVoteCommentAction,
  neutralCommentVoteAction,
} from '../../redux/threads/actions';

export default function VoteComments({ comment }) {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneThread(id));
    dispatch(userLogged());
  }, [id, dispatch]);

  const isUserUpvoted = () =>
    comment.upVotesBy && comment.upVotesBy.includes(user.id);

  const isUserDownvoted = () =>
    comment.downVotesBy && comment.downVotesBy.includes(user.id);

  const handleVoteUpdate = (voteType) => {
    if (voteType === 'up') {
      if (isUserUpvoted()) {
        dispatch(neutralCommentVoteAction(id, comment.id));
      } else {
        dispatch(upVoteCommentAction(id, comment.id));
      }
    } else if (voteType === 'down') {
      if (isUserDownvoted()) {
        dispatch(neutralCommentVoteAction(id, comment.id));
      } else {
        dispatch(downVoteCommentAction(id, comment.id));
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleVoteUpdate('up')}
        className={isUserUpvoted() ? 'text-yellow-600' : ''}
      >
        {`👍 ${comment.upVotesBy?.length}`}
      </button>
      <button
        type="button"
        onClick={() => handleVoteUpdate('down')}
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
