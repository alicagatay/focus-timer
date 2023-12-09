"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [timer, updateTime]: [number, (n: number) => void] = useState(0);
  type sessionType = "work" | "break";
  const [session, setSession]: [sessionType, (s: sessionType) => void] =
    useState<sessionType>("break");

  const [backgroundColour, setBackgroundColour]: [string, (s: string) => void] =
    useState("bg-black");

  const [textColour, setTextColour]: [string, (s: string) => void] =
    useState("text-white");

  function changeSession() {
    if (session === "work") {
      setSession("break");
      setBackgroundColour("bg-white");
      setTextColour("text-black");
    } else {
      setSession("work");
      setBackgroundColour("bg-black");
      setTextColour("text-white");
    }
  }

  function setTimer() {
    if (typeof window !== "undefined") {
      if (session === "work") {
        updateTime(
          (sessionStorage.getItem("workTime") as unknown as number) * 60,
        );
      } else {
        updateTime(
          (sessionStorage.getItem("breakTime") as unknown as number) * 60,
        );
      }
    }
  }

  function countDown() {
    if (timer === 0) {
      changeSession();
      setTimer();
    } else {
      const timeoutId = setTimeout(() => {
        updateTime(timer - 1);
      }, 1000);
      return timeoutId; // Return the ID of the timeout
    }
  }

  function convertTime() {
    const timeLeftInMinutes = Math.floor(timer / 60);
    const timeLeftInSeconds = timer % 60;
    let timeLeftInSecondsString = `${timeLeftInSeconds}`;
    let timeLeftInMinutesString = `${timeLeftInMinutes}`;
    if (timeLeftInSeconds < 10) {
      timeLeftInSecondsString = `0${timeLeftInSeconds}`;
    }
    if (timeLeftInMinutes < 10) {
      timeLeftInMinutesString = `0${timeLeftInMinutes}`;
    }
    return `${timeLeftInMinutesString}:${timeLeftInSecondsString}`;
  }

  countDown();

  useEffect(() => {
    const timerId = countDown();
    return () => clearTimeout(timerId); // Clean up the timer
  }, [timer]); // Depend on timer
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${backgroundColour} ${textColour}`}
    >
      <p className="text-[140px]">{convertTime()}</p>
    </div>
  );
}
