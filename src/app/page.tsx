"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [pathname, setPathname]: [string, (s: string) => void] = useState("/");

  const [buttonText, setButtonText]: [string, (s: string) => void] = useState(
    "Submit work and break time data.",
  );

  function storeWorkTime() {
    const workTime = document.getElementById("work-time") as HTMLInputElement;
    const breakTime = document.getElementById("break-time") as HTMLInputElement;

    if (workTime.value !== "" && breakTime.value !== "") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("workTime", workTime.value);
        sessionStorage.setItem("breakTime", breakTime.value);
      }

      setPathname("/timer");
      setButtonText("Press to start the timer.");
    } else {
      alert("Please enter a value for both work and break time.");
    }
  }

  function returnPathname(): string {
    return pathname;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[500px] w-[700px] flex-col items-center justify-center space-y-[30px] rounded-[30px] border-[4px] border-black text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <label htmlFor="start-date">
            Enter the time you want to work for in minutes:
          </label>
          <input
            id="work-time"
            className="flex h-[50px] w-[300px] flex-col rounded-[15px] border-[4px] border-black text-center "
            type="number"
          ></input>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <label htmlFor="end-date">
            Enter the time you want to have a break for in minutes:
          </label>
          <input
            id="break-time"
            className="flex h-[50px] w-[300px] flex-col rounded-[15px] border-[4px] border-black text-center"
            type="number"
          ></input>
        </div>

        <Link
          href={{
            pathname: returnPathname(),
          }}
        >
          <button
            className="flex h-[70px] w-[200px] flex-col items-center justify-center rounded-[15px] border-[4px] border-black text-center hover:bg-gray-300"
            type="submit"
            onClick={storeWorkTime}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
