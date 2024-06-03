import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createComments } from '../../redux/threads/actions';
import CButton from '../../components/CButton';

export default function CommentInput({ className, detailThread }) {
  const [inputValue, setInputValue] = useState('');
  const newCommentsRef = useRef(null);
  const dispatch = useDispatch();

  const handleInputChange = () => {
    const newCommentContent = newCommentsRef.current.innerText.trim();
    setInputValue(newCommentContent);
  };

  const handleComments = async (e) => {
    e.preventDefault();

    const newCommentContent = inputValue.trim();
    if (!newCommentContent || /^\s*$/.test(newCommentContent)) {
      alert('Comment cannot be empty or contain only spaces.');
      return;
    }

    dispatch(createComments(detailThread.id, newCommentContent));
    newCommentsRef.current.innerText = '';
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleComments}
      className={`flex flex-col gap-5 ${className}`}
    >
      <p className="font-medium text-xl">Leave a comment</p>
      <div
        ref={newCommentsRef}
        className="bg-transparent min-h-[100px] font-semibold text-xl text-black border border-black outline-none p-5 rounded-lg"
        contentEditable
        onInput={handleInputChange}
      />
      <CButton
        type="submit"
        className="bg-zinc-800 hover:bg-black px-5 py-2 text-center text-white rounded-lg"
      >
        Send
      </CButton>
    </form>
  );
}

CommentInput.propTypes = {
  detailThread: PropTypes.shape({
    id: PropTypes.string,
  }),
  className: PropTypes.string,
};
