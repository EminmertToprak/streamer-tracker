import Link from "next/link";

import logo from "../../public/logo.png";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div id="title" className="flex flex-row items-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Streamer <span className="text-gradient">Tracker</span>
          </h1>
          <img src={logo.src} alt="logo" className="h-24 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/login"
          >
            <h3 className="text-2xl font-bold">Login →</h3>
            <div className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae, veniam!
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/signup"
          >
            <h3 className="text-2xl font-bold">Sign Up →</h3>
            <div className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum,
              explicabo soluta!
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
