import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/home";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Dashboard from "../pages/dashboard";
import RequireAuth from "./requireAuth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route element={<RequireAuth />}>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);
