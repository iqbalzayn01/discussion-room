import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import parser from "html-react-parser";

import { getThread } from "../../utils/fetch";
import { setDetailThread } from "../../redux/threadsSlice";
import VoteDetailThread from "../../components/CVoteBtn/VoteDetailThread";
import Topbar from "../../components/Topbar";

export default function DetailThread() {
  const { id } = useParams();
  const detailThread = useSelector((state) => state.threads.detailThread);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getThread(id);
        const dataThread = res.data.detailThread;

        dispatch(setDetailThread(dataThread));
      } catch (error) {
        console.error("Get One Thread Error:", error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const formatCreatedAt = (createdAt) => {
    const postDate = new Date(createdAt);
    const now = new Date();

    const diffTime = now - postDate;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 1) {
      return `${diffDays} days ago`;
    }
    if (diffHours > 1) {
      return `${diffHours} hours ago`;
    }
    if (diffMinutes > 1) {
      return `${diffMinutes} minutes ago`;
    }
    return `${diffSeconds} seconds ago`;
  };

  return (
    <>
      <Topbar />
      <section className="container-base px-5">
        <div className="flex flex-col gap-5">
          <p className="w-fit text-[#787878] border border-[#787878] px-2 py-1 rounded-lg">
            #{detailThread.category}
          </p>
          <h2 className="text-4xl font-medium">{detailThread.title}</h2>
          <div className="text-base">
            {detailThread.body ? parser(detailThread.body) : ""}
          </div>
          {detailThread.owner && (
            <div className="flex items-center">
              <VoteDetailThread />
              <div className="flex items-center gap-3">
                <p>Created by</p>
                {detailThread.owner.avatar && (
                  <img
                    src={detailThread.owner.avatar}
                    alt="Avatar"
                    className="w-[36px] h-[36px] rounded-full object-cover"
                  />
                )}
                <p>{detailThread.owner.name}</p>
                <p>{formatCreatedAt(detailThread.createdAt)}</p>
              </div>
            </div>
          )}

          <hr className="bg-black h-[1.5px]" />
          <Link
            to="/forums"
            className="text-black text-center hover:underline mt-5"
          >
            {`< Back`}
          </Link>
        </div>
      </section>
    </>
  );
}
