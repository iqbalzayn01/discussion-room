import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";

import VoteThreads from "../../components/CVoteBtn/VoteThreads";

export default function GridColTwo({
  users,
  threads,
  isLoading,
  getAvatarById,
  getUserNameById,
}) {
  const handleVoteUpdate = (updatedThread) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    return updatedThreads;
  };

  return (
    <div className="col-span-2">
      <div className="bg-white flex flex-col gap-10 p-5 rounded-lg">
        {isLoading ? (
          <p className="text-black">Loading . . .</p>
        ) : (
          threads.map((thread) => (
            <div key={thread.id} className="flex flex-col gap-2 mb-5">
              <div className="flex items-center gap-2">
                <img
                  src={getAvatarById(thread.ownerId)}
                  alt="Avatar"
                  className="w-[36px] h-[36px] rounded-full object-cover"
                />
                <p className="text-sm">
                  {getUserNameById(users, thread.ownerId)}
                </p>
              </div>
              <p className="w-fit text-[#787878] border border-[#787878] px-2 py-1 rounded-lg">
                #{thread.category}
              </p>
              <Link to={`/detail-thread/${thread.id}`}>
                <h2 className="text-xl hover:text-gray-500 font-medium">
                  {thread.title}
                </h2>
              </Link>
              <div className="text-base">{parser(thread.body)}</div>
              <VoteThreads
                thread={thread}
                handleVoteUpdate={handleVoteUpdate}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

GridColTwo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.array,
      downVotesBy: PropTypes.array,
    })
  ),
  isLoading: PropTypes.bool,
  getAvatarById: PropTypes.func,
  getUserNameById: PropTypes.func,
};
