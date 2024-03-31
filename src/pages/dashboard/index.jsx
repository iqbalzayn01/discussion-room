import Topbar from "../../components/Topbar";
import GridColOne from "./gridColOne";
import GridColTwo from "./gridColTwo";
import GridColThree from "./gridColThree";

export default function Dashboard() {
  return (
    <>
      <Topbar />
      <main className="container-base px-5">
        <div className="grid grid-cols-4 gap-5">
          <GridColOne />
          <GridColTwo />
          <GridColThree />
        </div>
      </main>
    </>
  );
}
