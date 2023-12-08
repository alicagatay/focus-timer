"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[500px] w-[700px] flex-col items-center justify-center space-y-[30px] rounded-[30px] border-[4px] border-black text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <label htmlFor="start-date">
            Enter the time you want to work for in minutes:
          </label>
          <input
            id="start-date"
            className="flex h-[50px] w-[300px] flex-col rounded-[15px] border-[4px] border-black text-center "
            type="number"
          ></input>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <label htmlFor="end-date">
            Enter the time you want to have a break for in minutes:
          </label>
          <input
            id="end-date"
            className="flex h-[50px] w-[300px] flex-col rounded-[15px] border-[4px] border-black text-center"
            type="number"
          ></input>
        </div>

        <Link
          href={{
            pathname: "/stock-list",
          }}
        >
          <button
            className="flex h-[50px] w-[200px] flex-col items-center justify-center rounded-[15px] border-[4px] border-black text-center hover:bg-gray-300"
            type="submit"
          >
            Submit date data
          </button>
        </Link>
      </div>
    </div>
  );
}
