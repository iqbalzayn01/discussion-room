import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { fetchAllUsers } from '../../redux/auth/actions';
import { setThreads, fetchAllThreads } from '../../redux/threads/actions';
import { fetchLeaderboards } from '../../redux/leaderboards/actions';
import Header from '../../components/Header';
import GridColOne from './gridColOne';
import GridColTwo from './gridColTwo';

export default function Forums() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.auth.users);
  const leaderboards = useSelector((state) => state.leaderboards.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    setIsLoading(true);
    dispatch(fetchAllThreads())
      .then(() => dispatch(fetchAllUsers()))
      .then(() => dispatch(fetchLeaderboards()))
      .then(() => {
        setIsLoading(false);
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        dispatch(hideLoading());
      });
  }, [dispatch]);

  const getAvatarById = (ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    if (!user) return '';

    const avatarWithoutSpaces = user.avatar.replace(/\s/g, '');
    return avatarWithoutSpaces;
  };

  const getUserNameById = (ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    return user ? user.name : 'Unknown';
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
    if (sortBy === 'newest') {
      const sortedThreads = [...threads].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      dispatch(setThreads(sortedThreads));
    } else if (sortBy === 'oldest') {
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
      const dataThreads = [];

      if (category !== '') {
        filteredThreads = threads.filter(
          (thread) => thread.category === category
        );
        setSelectedCategory(category);
      } else {
        dispatch(fetchAllThreads());
        setSelectedCategory('');
      }

      dispatch(
        setThreads(filteredThreads.length > 0 ? filteredThreads : dataThreads)
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error filtering threads:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
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
