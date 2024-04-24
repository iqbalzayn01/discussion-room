import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CInputLabel from '../CInputLabel';

export default function CSearch({ placeholder, updateSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    updateSearch(newSearchTerm);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('keyword', newSearchTerm);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <form className="bg-white p-5 rounded-lg">
      <CInputLabel
        type="text"
        name="search"
        value={searchTerm}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full bg-transparent text-black dark:text-white border-0 outline-none"
      />
    </form>
  );
}

CSearch.propTypes = {
  placeholder: PropTypes.string,
  updateSearch: PropTypes.func.isRequired,
};

CSearch.defaultProps = {
  placeholder: 'Search...',
};
