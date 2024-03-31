import CButton from "../../components/CButton";

export default function GridColOne() {
  return (
    <div className="col-span-1 flex flex-col gap-5">
      <CButton className="w-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-lg">
        Create New Discussion
      </CButton>
      <form className="flex flex-col gap-5 bg-white p-5 rounded-lg">
        <p className="font-medium text-lg">Sort by</p>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="sortBy" value="newest" />
          Newest Discussions
        </label>
        <label className="flex items-center gap-2 text-black">
          <input type="radio" name="sortBy" value="oldest" />
          Oldest Discussions
        </label>
      </form>
      <div className="flex flex-col gap-5 bg-black p-5 rounded-lg">
        <p className="font-medium text-white text-lg">Popular keywords</p>
        <div className="flex flex-wrap gap-[10px]">
          <span className="bg-white px-2 py-[6px] rounded-lg">#react</span>
          <span className="bg-white px-2 py-[6px] rounded-lg">#redux</span>
          <span className="bg-white px-2 py-[6px] rounded-lg">#submission</span>
          <span className="bg-white px-2 py-[6px] rounded-lg">#testing</span>
          <span className="bg-white px-2 py-[6px] rounded-lg">#javascript</span>
          <span className="bg-white px-2 py-[6px] rounded-lg">#javascript</span>
        </div>
      </div>
    </div>
  );
}
