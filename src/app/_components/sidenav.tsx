export default function SideNav() {
  return (
    <div
      id="sidenav"
      className="border-white-300 flex w-full flex-col items-center gap-4"
    >
      <div id="following_streamers" className="h-full">
        <h2 className="text-white-600 text-xl font-bold">
          Following Streamers
        </h2>
        <div
          id="following_streamers_list"
          className="flex flex-col items-center gap-4"
        ></div>
      </div>
    </div>
  );
}
