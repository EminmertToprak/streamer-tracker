"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  interface FormData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const formStyle = "flex flex-col w-full items-center gap-2";
  const inputBoxStyle = "rounded border border-gray-300";
  const labelStyle = "text-white-600 font-semibold";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      router.push("/home");
      console.log("login clicked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-row items-center justify-center gap-4 px-4 py-16">
        <h1 className="text-2xl font-extrabold">
          Streamer <span className="text-gradient">Tracker</span>
        </h1>
        <img src="/logo.png" alt="logo" className="h-12 w-12" />
      </div>
      <h2 className="text-white-600 mt-4 text-center text-xl font-bold">
        Log In
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-1/4 flex-col items-center gap-4 rounded border border-gray-300 p-4"
      >
        <div className={formStyle}>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            // required
            maxLength={40}
            className={inputBoxStyle}
          />
        </div>

        <div className={formStyle}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            // required
            maxLength={15}
            className={inputBoxStyle}
          />
        </div>
        <div
          id="buttons"
          className="flex h-full w-full flex-row flex-nowrap items-center justify-center gap-4 text-center"
        >
          <button
            id="log-in-button"
            type="submit"
            className="mx-auto block h-12 w-1/2 cursor-pointer select-none rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-300"
          >
            Log In
          </button>
          <button
            id="twitch-button"
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="mx-auto my-2 block h-12 w-1/2 cursor-pointer select-none rounded bg-[#9146ff] px-4 py-2 text-center font-bold text-white hover:bg-[#7517ff] disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <span className="flex flex-row items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
                className="h-6 w-6 flex-shrink-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z" />
              </svg>
              <span className="ml-2">Twitch</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
