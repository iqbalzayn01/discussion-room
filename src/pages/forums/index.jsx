import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllUsers, getAllThreads } from "../../utils/fetch";
import { setUsers } from "../../redux/authSlice";
import { setThreads } from "../../redux/threadsSlice";
import Topbar from "../../components/Topbar";
import GridColOne from "./gridColOne";
import GridColTwo from "./gridColTwo";
import GridColThree from "./gridColThree";

export default function Forums() {
  const [isLoading, setIsLoading] = useState(false);
  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllThreads();
        const resUsers = await getAllUsers();
        const dataThreads = res.data.threads;
        const dataAllUsers = resUsers.data.users;

        dispatch(setThreads(dataThreads));
        dispatch(setUsers(dataAllUsers));
        setIsLoading(false);
      } catch (error) {
        console.error("Get All Threads Error:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, [dispatch]);

  const getAvatarById = (ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    if (!user) return "";

    const avatarWithoutSpaces = user.avatar.replace(/\s/g, "");
    return avatarWithoutSpaces;
  };

  const getUserNameById = (users, ownerId) => {
    const user = users.find((user) => user.id === ownerId);
    return user ? user.name : "Unknown";
  };

  return (
    <>
      <Topbar />
      <main className="container-base px-5">
        <div className="grid md:grid-cols-4 gap-5">
          <GridColOne />
          <GridColTwo
            users={users}
            threads={threads}
            isLoading={isLoading}
            getAvatarById={getAvatarById}
            getUserNameById={getUserNameById}
          />
          <GridColThree users={users} isLoading={isLoading} />
        </div>
      </main>
    </>
  );
}
