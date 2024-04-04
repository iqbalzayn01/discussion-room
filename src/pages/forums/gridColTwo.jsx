import PropTypes from "prop-types";
import parser from "html-react-parser";

export default function GridColTwo({ threads, isLoading }) {
  return (
    <div className="bg-black col-span-2 text-white p-5 rounded-lg">
      {isLoading ? (
        <p className="text-white">Loading . . .</p>
      ) : (
        threads.map((thread) => (
          <div key={thread.id} className="mb-5">
            <h2 className="text-xl font-bold">{thread.title}</h2>
            {/* <p className="text-sm">{thread.body}</p> */}
            {parser(thread.body)}
            <p className="text-xs mt-1">Category: {thread.category}</p>
          </div>
        ))
      )}
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
    })
  ),
  isLoading: PropTypes.bool,
};
