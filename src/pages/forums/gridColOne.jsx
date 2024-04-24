import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Learderboards from './leaderboards';
import CButton from '../../components/CButton';
import CSortBy from '../../components/CSortBy';

export default function GridColOne({
  threads,
  handleSortBy,
  handleResetSort,
  handleCategoryFilter,
  selectedCategory,
  leaderboards,
  isLoading,
}) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      handleCategoryFilter('');
    } else {
      handleCategoryFilter(category);
    }
  };

  return (
    <div className="col-span-3 md:col-span-1 flex flex-col gap-5">
      <CButton
        action={() => {
          navigate('/newthreads');
        }}
        className="w-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-lg"
      >
        Create New Discussion
      </CButton>
      <CSortBy handleSortBy={handleSortBy} handleResetSort={handleResetSort} />
      <div className="flex flex-col gap-5 bg-black p-5 rounded-lg">
        <p className="font-medium text-white text-lg">Popular keywords</p>
        <ul className="flex flex-wrap gap-[10px]">
          {threads.map((thread) => (
            <li key={thread.id}>
              <CButton
                type="button"
                className={`bg-white px-2 py-[6px] rounded-lg ${
                  selectedCategory === thread.category ? 'bg-gray-400' : ''
                }`}
                action={() => handleCategoryClick(thread.category)}
              >
                {`#${thread.category}`}
              </CButton>
            </li>
          ))}
        </ul>
      </div>
      <Learderboards leaderboards={leaderboards} isLoading={isLoading} />
    </div>
  );
}

GridColOne.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  handleSortBy: PropTypes.func.isRequired,
  handleResetSort: PropTypes.func.isRequired,
  handleCategoryFilter: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
};
