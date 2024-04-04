import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllThreads } from "../../utils/fetch";
import { setThreads } from "../../redux/threadsSlice";
import Topbar from "../../components/Topbar";
import GridColOne from "./gridColOne";
import GridColTwo from "./gridColTwo";
import GridColThree from "./gridColThree";

export default function Forums() {
  const [isLoading, setIsLoading] = useState(false);
  const threads = useSelector((state) => state.threads.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllThreads();
        const dataThreads = res.data.threads;
        dispatch(setThreads(dataThreads));
        setIsLoading(false);
      } catch (error) {
        console.error("Get All Threads Error:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <main className="container-base px-5">
        <div className="grid md:grid-cols-4 gap-5">
          <GridColOne />
          <GridColTwo threads={threads} isLoading={isLoading} />
          <GridColThree />
        </div>
      </main>
    </>
  );
}
