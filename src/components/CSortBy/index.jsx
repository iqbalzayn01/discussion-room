import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CSortBy({ handleSortBy, handleResetSort }) {
  const [selectedSort, setSelectedSort] = useState('');

  const handleChange = (e) => {
    const sortBy = e.target.value;
    setSelectedSort(sortBy);
    handleSortBy(sortBy);
  };

  const handleReset = () => {
    setSelectedSort('');
    handleResetSort();
  };

  return (
    <form className="flex flex-col gap-5 bg-white p-5 rounded-lg">
      <p className="font-medium text-lg">Sort by</p>
      <div className="flex items-center gap-2 text-black">
        <input
          type="radio"
          name="sortBy"
          value="newest"
          checked={selectedSort === 'newest'}
          onChange={handleChange}
        />
        Newest Discussions
      </div>
      <div className="flex items-center gap-2 text-black">
        <input
          type="radio"
          name="sortBy"
          value="oldest"
          checked={selectedSort === 'oldest'}
          onChange={handleChange}
        />
        Oldest Discussions
      </div>
      <button
        type="button"
        className="bg-gray-200 text-black px-4 py-2 rounded-lg"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
}

CSortBy.propTypes = {
  handleSortBy: PropTypes.func.isRequired,
  handleResetSort: PropTypes.func.isRequired,
};
