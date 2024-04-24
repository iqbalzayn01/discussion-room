import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Home from '../pages/home';
import SignUp from '../pages/signup';
import SignIn from '../pages/signin';
import Forums from '../pages/forums';
import NewThreads from '../pages/newThreads';
import DetailThread from '../pages/detailThread';
import RequireAuth from './requireAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forums" element={<Forums />} />
      <Route element={<RequireAuth />}>
        <Route path="/newthreads" element={<NewThreads />} />
        <Route path="/detail-thread/:id" element={<DetailThread />} />
      </Route>
    </>
  )
);

export default router;
