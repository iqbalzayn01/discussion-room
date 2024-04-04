import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../pages/home";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
import Forums from "../pages/forums";
import NewThreads from "../pages/newThreads";
import RequireAuth from "./requireAuth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forums" element={<Forums />} />

      <Route element={<RequireAuth />}>
        <Route path="/newthreads" element={<NewThreads />} />
      </Route>
    </>
  )
);
