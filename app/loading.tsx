"use client";
export default function Loading() {
  return (
    <div className="h-screen w-screen grid place-items-center bg-gray-200 dark:bg-gray-800">
      <div className="animate-bounce mt-5 h-16 w-16 rounded-md bg-gradient-to-t from-yellow-500 to-red-500 dark:from-yellow-300 dark:to-red-300" />
    </div>
  );
}
