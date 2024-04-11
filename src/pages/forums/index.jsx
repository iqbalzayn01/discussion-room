import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllUsers, getAllThreads, getLeaderboards } from "../../utils/fetch";
import { setUsers } from "../../redux/authSlice";
import { setThreads } from "../../redux/threadsSlice";
import { setLeaderboards } from "../../redux/leaderboardSlice";
import Topbar from "../../components/Topbar";
import GridColOne from "./gridColOne";
import GridColTwo from "./gridColTwo";

export default function Forums() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.auth.users);
  const leaderboards = useSelector((state) => state.leaderboards.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllThreads();
        const resUsers = await getAllUsers();
        const resLeaderboards = await getLeaderboards();
        const dataThreads = res.data.threads;
        const dataAllUsers = resUsers.data.users;
        const dataLeaderboards = resLeaderboards.data.leaderboards;

        dispatch(setThreads(dataThreads));
        dispatch(setUsers(dataAllUsers));
        dispatch(setLeaderboards(dataLeaderboards));
        setIsLoading(false);
      } catch (error) {
        console.error("Get All Threads Error:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, [dispatch]);

  const getAvatarById = (ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    if (!user) return "";

    const avatarWithoutSpaces = user.avatar.replace(/\s/g, "");
    return avatarWithoutSpaces;
  };

  const getUserNameById = (users, ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    return user ? user.name : "Unknown";
  };

  const handleVoteUpdate = (updatedThread) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === updatedThread.id ? updatedThread : thread
    );
    return updatedThreads;
  };

  const updateSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const handleSortBy = (sortBy) => {
    if (sortBy === "newest") {
      const sortedThreads = [...threads].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(setThreads(sortedThreads));
    } else if (sortBy === "oldest") {
      const sortedThreads = [...threads].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      dispatch(setThreads(sortedThreads));
    }
  };

  const handleResetSort = () => {
    const sortedThreads = [...threads].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    dispatch(setThreads(sortedThreads));
  };

  const handleCategoryFilter = async (category) => {
    let filteredThreads = [];

    try {
      setIsLoading(true);
      let dataThreads = [];

      if (category !== "") {
        filteredThreads = threads.filter(
          (thread) => thread.category === category
        );
        setSelectedCategory(category);
      } else {
        const res = await getAllThreads();
        dataThreads = res.data.threads;
        setSelectedCategory("");
      }

      dispatch(
        setThreads(filteredThreads.length > 0 ? filteredThreads : dataThreads)
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error filtering threads:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar />
      <main className="container-base px-5">
        <div className="grid md:grid-cols-4 gap-5">
          <GridColOne
            threads={threads}
            handleSortBy={handleSortBy}
            handleResetSort={handleResetSort}
            handleCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
            leaderboards={leaderboards}
            isLoading={isLoading}
          />
          <GridColTwo
            users={users}
            threads={filteredThreads}
            isLoading={isLoading}
            getAvatarById={getAvatarById}
            getUserNameById={getUserNameById}
            handleVoteUpdate={handleVoteUpdate}
            updateSearch={updateSearch}
          />
        </div>
      </main>
    </>
  );
}
