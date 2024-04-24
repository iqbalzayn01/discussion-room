import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { setToken } from '../../redux/auth/actions';
import { login } from '../../utils/fetch';
import FormSignIn from './formSignIn';
import Logo from '../../components/Logo';

export default function SignIn() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoading());
    setIsLoading(true);
    try {
      const res = await login(formData);
      const { token } = res.data;
      dispatch(setToken(token));
      setIsLoading(false);
      dispatch(hideLoading());
      navigate('/forums');
    } catch (error) {
      console.error('Error login:', error);
      setIsLoading(false);
      dispatch(hideLoading());
    }
  };

  if (getToken) return <Navigate to="/forums" replace />;

  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <Logo />
        <h3 className="text-2xl text-black dark:text-white text-center">
          Sign In
        </h3>
        <FormSignIn
          valueEmail={formData.email}
          valuePassword={formData.password}
          handleSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
