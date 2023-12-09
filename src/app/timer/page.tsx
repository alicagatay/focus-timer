"use client";
import { useState } from "react";

export default function Page() {
  const [timer, updateTime]: [number, (n: number) => void] = useState(0);
  type sessionType = "work" | "break";
  const [session, setSession]: [sessionType, (s: sessionType) => void] =
    useState<sessionType>("work");

  function changeSession() {
    if (session === "work") {
      setSession("break");
    } else {
      setSession("work");
    }
  }

  function setTimer() {
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

  function countDown() {
    if (timer === 0) {
      changeSession();
      setTimer();
    } else {
      setTimeout(() => {
        updateTime(timer - 1);
      }, 1000);
    }
  }

  countDown();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p className="text-[140px]">{timer}</p>
    </div>
  );
}
