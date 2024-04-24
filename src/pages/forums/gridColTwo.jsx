import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import VoteThreads from '../../components/CVoteBtn/VoteThreads';
import CSearch from '../../components/CSearch';
import formatCreatedAt from '../../utils/formatCreatedAt';

export default function GridColTwo({
  threads,
  isLoading,
  getAvatarById,
  getUserNameById,
  handleVoteUpdate,
  updateSearch,
}) {
  return (
    <div className="col-span-3">
      <div className="flex flex-col gap-5">
        <CSearch placeholder="Search . . ." updateSearch={updateSearch} />
        <div className="bg-white flex flex-col gap-10 p-5 rounded-lg">
          {isLoading ? (
            <p className="text-black">Loading . . .</p>
          ) : (
            threads.map((thread) => (
              <div key={thread.id} className="flex flex-col gap-2 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={getAvatarById(thread.ownerId)}
                      alt="Avatar"
                      className="w-[36px] h-[36px] rounded-full object-cover"
                    />
                    <p className="text-sm">{getUserNameById(thread.ownerId)}</p>
                  </div>
                  <p className="text-[#787878]">
                    {formatCreatedAt(thread.createdAt)}
                  </p>
                </div>
                <Link to={`/detail-thread/${thread.id}`}>
                  <h2 className="text-xl hover:text-gray-500 font-medium">
                    {thread.title}
                  </h2>
                </Link>
                <div className="text-base">{parser(thread.body)}</div>
                <p className="w-fit text-[#787878] border border-[#787878] px-2 py-1 rounded-lg mt-2">
                  {`#${thread.category}`}
                </p>
                <div className="flex items-center gap-3">
                  <VoteThreads
                    thread={thread}
                    handleVoteUpdate={handleVoteUpdate}
                  />
                  <p>{`🗨️ ${thread.totalComments}`}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

GridColTwo.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.array,
      downVotesBy: PropTypes.array,
      totalComments: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
  getAvatarById: PropTypes.func,
  getUserNameById: PropTypes.func,
  handleVoteUpdate: PropTypes.func,
  updateSearch: PropTypes.func,
};
