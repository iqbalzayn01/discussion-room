import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserLogged,
  getThread,
  upVoteThread,
  downVoteThread,
  neutralThreadVote,
} from "../../utils/fetch";
import { setOneUser } from "../../redux/authSlice";
import { setDetailThread } from "../../redux/threadsSlice";

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
        console.error("Get One Thread Error:", error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const isUserUpvoted = (thread, userId) => {
    return thread.upVotesBy && thread.upVotesBy.includes(userId);
  };

  const isUserDownvoted = (thread, userId) => {
    return thread.downVotesBy && thread.downVotesBy.includes(userId);
  };

  const updateVotes = (thread, userId, voteType) => {
    let updatedThread = { ...thread };

    if (voteType === "up") {
      updatedThread.upVotesBy = isUserUpvoted(thread, userId)
        ? thread.upVotesBy.filter((id) => id !== userId)
        : [...thread.upVotesBy, userId];

      if (isUserDownvoted(thread, userId)) {
        updatedThread.downVotesBy = thread.downVotesBy.filter(
          (id) => id !== userId
        );
      }
    } else if (voteType === "down") {
      updatedThread.downVotesBy = isUserDownvoted(thread, userId)
        ? thread.downVotesBy.filter((id) => id !== userId)
        : [...thread.downVotesBy, userId];

      if (isUserUpvoted(thread, userId)) {
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
      if (isUserUpvoted(detailThread, user.id)) {
        await neutralThreadVote(detailThread.id);
      } else {
        await upVoteThread(detailThread.id, 1);
      }

      const updatedThread = updateVotes(detailThread, user.id, "up");
      dispatch(setDetailThread(updatedThread));
    } catch (error) {
      console.error("Upvote Error:", error);
    }
  };

  const handleDownvote = async (e) => {
    e.preventDefault();

    try {
      if (isUserDownvoted(detailThread, user.id)) {
        await neutralThreadVote(detailThread.id);
      } else {
        await downVoteThread(detailThread.id, -1);
      }

      const updatedThread = updateVotes(detailThread, user.id, "down");
      dispatch(setDetailThread(updatedThread));
    } catch (error) {
      console.error("Downvote Error:", error);
    }
  };
  return (
    <>
      <button type="button" onClick={handleUpvote}>
        <p>👍</p>
        <p>{detailThread.upVotesBy?.length}</p>
      </button>
      <button type="button" onClick={handleDownvote}>
        <p>👎</p>
        <p>{detailThread.downVotesBy?.length}</p>
      </button>
    </>
  );
}
