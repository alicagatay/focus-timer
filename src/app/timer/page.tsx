"use client";
export default function Page() {
  console.log(sessionStorage);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[500px] w-[700px] flex-col items-center justify-center space-y-[30px] rounded-[30px] border-[4px] border-black text-center">
        <h1 className="text-4xl font-bold">Welcome to the Pomodoro Timer!</h1>
        <p className="text-xl">
          This is a timer that will help you work for a set amount of time and
          then take a break for a set amount of time.
        </p>
        <p className="text-xl">
          Please enter the amount of time you want to work for and the amount of
          time you want to break for in minutes.
        </p>
        <p className="text-xl">Then click the button to start the timer.</p>
      </div>
    </div>
  );
}
