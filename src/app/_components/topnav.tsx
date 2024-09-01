import Link from "next/link";

function TopNav() {
  const buttonStyle = "px-3 py-2 text-white hover:bg-white/20";

  return (
    <div className="text-large m-4 flex flex-row items-center font-bold">
      <div className="flex flex-row items-center gap-4">
        <img src="/logo.png" alt="logo" className="h-12 w-12" />
      </div>
      <div id="buttons" className="items-left ml-8 flex flex-row gap-4">
        <Link href="/login" className={buttonStyle}>
          Browse
        </Link>
        <Link href="/signup" className={buttonStyle}>
          Following
        </Link>
      </div>
      <div id="search-bar" className="ml-auto w-1/4 items-center gap-4">
        <form className="mx-auto max-w-md">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search Streamers"
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();

                  console.log("Search triggered by Enter key");
                }
              }}
            />
          </div>
        </form>
      </div>
      <div id="profile" className="ml-auto flex flex-row items-center gap-4">
        <Link href="/login" className={buttonStyle}>
          Log In
        </Link>
        <Link href="/signup" className={buttonStyle}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default TopNav;
