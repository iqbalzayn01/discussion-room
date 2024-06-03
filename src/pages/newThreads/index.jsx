import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { createThreads } from '../../redux/threads/actions';
import CButton from '../../components/CButton';

export default function NewThreads() {
  const [formDataState, setFormDataState] = useState({
    title: '',
    body: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const newThreadsBodyRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleBodyChange = () => {
    const newThreadsBody = newThreadsBodyRef.current.innerText;
    setFormDataState({ ...formDataState, body: newThreadsBody });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    try {
      await dispatch(createThreads(formDataState));
      navigate('/forums');
    } catch (error) {
      console.error('Create New Threads Error:', error);
      setError('Create new threads error');
    } finally {
      setIsLoading(false);
      dispatch(hideLoading());
    }
  };

  return (
    <section className="container-base max-w-[900px] min-h-[100vh] p-5">
      <form
        onSubmit={handleSubmit}
        className="flex h-screen flex-col justify-center gap-5"
      >
        <h3 className="text-3xl font-medium text-black dark:text-white text-center mb-10">
          New Threads
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          value={formDataState.title}
          onChange={handleChange}
          maxLength={50}
          className="bg-transparent font-semibold text-4xl text-black border-b border-black outline-none pb-5"
          required
        />
        <input
          id="category"
          type="text"
          name="category"
          placeholder="Category"
          value={formDataState.category}
          onChange={handleChange}
          maxLength={25}
          className="bg-transparent font-semibold text-4xl text-black border-b border-black outline-none pb-5"
          required
        />
        <div
          ref={newThreadsBodyRef}
          className="isolate font-semibold text-xl text-black border border-black outline-none p-5 rounded-lg"
          contentEditable
          onInput={handleBodyChange}
        />
        <CButton
          type="submit"
          className="bg-zinc-800 hover:bg-black px-5 py-2 text-center text-white rounded-lg"
          loading={isLoading}
          disabled={isLoading}
        >
          Create New Threads
        </CButton>
        <Link to="/forums" className="text-black text-center hover:underline">
          {'< Back'}
        </Link>
      </form>
    </section>
  );
}
