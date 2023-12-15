"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const breakNotification = () => toast("Time for a break!");
  const workNotification = () => toast("Time to get back to work!");
  const [timer, updateTime]: [number, (n: number) => void] = useState(0);
  type sessionType = "work" | "break";
  const [session, setSession]: [sessionType, (s: sessionType) => void] =
    useState<sessionType>("break");

  const [backgroundColour, setBackgroundColour]: [string, (s: string) => void] =
    useState("bg-black");

  const [textColour, setTextColour]: [string, (s: string) => void] =
    useState("text-white");

  type notificationThemeType = "light" | "dark" | "colored";
  const [notificationTheme, setNotificationTheme] =
    useState<notificationThemeType>("light");

  function playNotificationSound() {
    const soundFile = "/sounds/notify.wav";
    const sound = new Audio(soundFile);

    sound
      .play()
      .then(() => {
        console.log("Playback successful");
      })
      .catch((error) => {
        console.error("Playback failed", error);
      });
  }

  function changeSession() {
    if (session === "work") {
      setSession("break");
      setBackgroundColour("bg-white");
      setTextColour("text-black");
      setNotificationTheme("light");
      breakNotification();
      playNotificationSound();
    } else {
      setSession("work");
      setBackgroundColour("bg-black");
      setTextColour("text-white");
      setNotificationTheme("dark");
      workNotification();
      playNotificationSound();
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
      return timeoutId;
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

  useEffect(() => {
    const timerId = countDown();
    return () => clearTimeout(timerId);
  }, [timer]);
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${backgroundColour} ${textColour}`}
    >
      <p className="text-[140px]">{convertTime()}</p>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={notificationTheme}
      />
    </div>
  );
}
