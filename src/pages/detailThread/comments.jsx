import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import VoteComments from '../../components/CVoteBtn/VoteComments';
import formatCreatedAt from '../../utils/formatCreatedAt';

export default function Comments({ className, comments }) {
  return (
    <ul className={`flex flex-col gap-10 ${className}`}>
      <li className="font-medium text-xl">
        {comments ? `${comments.length} Comments` : '0 Comments'}
      </li>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <li key={comment.id} className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={comment.owner.avatar}
                  alt="Avatar"
                  className="w-[36px] h-[36px] rounded-full object-cover"
                />
                <p>{comment.owner.name}</p>
              </div>
              <div>{parser(String(comment.content))}</div>
              <div className="flex items-center">
                <VoteComments comment={comment} />
              </div>
            </div>
            <p>{formatCreatedAt(comment.createdAt)}</p>
          </li>
        ))
      ) : (
        <li>No comments yet.</li>
      )}
    </ul>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  className: PropTypes.string,
};
