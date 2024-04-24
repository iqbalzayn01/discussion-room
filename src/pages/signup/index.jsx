import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { addUser } from '../../redux/auth/actions';
import { register } from '../../utils/fetch';
import FormSignUp from './formSignUp';
import Logo from '../../components/Logo';

export default function SignUp() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoading());
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const dataUser = res.data;
      dispatch(addUser(dataUser));
      setIsLoading(false);
      dispatch(hideLoading());
      navigate('/signin');
    } catch (error) {
      console.error('SIGNUP_ERROR:', error);
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
          Sign Up
        </h3>
        {passwordMatchError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Passwords do not match. Please try again.
          </p>
        )}
        <FormSignUp
          valueName={formData.name}
          valueEmail={formData.email}
          valuePassword={formData.password}
          valueConfirmPassword={formData.confirmPassword}
          handleSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
