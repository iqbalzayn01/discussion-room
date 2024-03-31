import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { setToken } from "../../redux/authSlice";
import { login } from "../../utils/fetch";
import FormSignIn from "./formSignIn";
import Logo from "../../components/Logo";

export default function SignIn() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await login(formData);
      const token = res.data.token;
      dispatch(setToken(token));
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error login:", error);
      setIsLoading(false);
    }
  };

  if (getToken) return <Navigate to="/dashboard" replace={true} />;

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
