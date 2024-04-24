import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser, clearToken } from '../../redux/auth/actions';
import Navbar from '../Navbar';
import CButton from '../CButton';

export default function Header() {
  const getToken = useSelector((state) => state.auth.token);
  const getUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getToken) {
          dispatch(fetchUser());
        }
      } catch (error) {
        console.error('Get One User Error:', error);
      }
    };

    fetchData();
  }, [getToken, dispatch]);

  const shouldDisplayNavbar = () => location.pathname === '/';

  const handleSignOut = () => {
    dispatch(clearToken());
    navigate('/');
  };

  return (
    <header className="container-base p-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23ZM38 13C38 15.7614 35.7614 18 33 18C30.2386 18 28 15.7614 28 13C28 10.2386 30.2386 8 33 8C35.7614 8 38 10.2386 38 13ZM18 38C23.5228 38 28 33.5228 28 28C28 22.4772 23.5228 18 18 18C12.4772 18 8 22.4772 8 28C8 33.5228 12.4772 38 18 38Z"
              fill="url(#paint0_linear_104_10)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_104_10"
                x1="0"
                y1="23"
                x2="46"
                y2="23"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6A48" />
                <stop offset="1" stopColor="#6248FF" />
              </linearGradient>
            </defs>
          </svg>
          <p className="font-semibold text-black dark:text-white text-xl">
            Discussion
            <br />
            Room
          </p>
        </Link>
        {shouldDisplayNavbar() && (
          <Navbar className="flex items-center gap-10" />
        )}
        <div className="flex items-center justify-end gap-5">
          {getToken ? (
            <>
              <p className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg">
                {`Hi, ${getUser.name}`}
              </p>
              <CButton
                action={handleSignOut}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg"
              >
                {'Sign Out >'}
              </CButton>
            </>
          ) : (
            <>
              <CButton
                action={() => {
                  navigate('/signin');
                }}
                className="flex items-center justify-center bg-white px-3 py-2 rounded-lg"
              >
                Sign In
              </CButton>
              <CButton
                action={() => {
                  navigate('/signup');
                }}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg"
              >
                Sign Up
              </CButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
