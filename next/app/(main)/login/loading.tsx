"use client";
export default function Loading() {
  return (
    <div className="grid h-screen w-screen place-items-center bg-gray-200 dark:bg-gray-800">
      <div className="mt-5 h-16 w-16 animate-bounce rounded-md bg-gradient-to-t from-yellow-500 to-red-500 dark:from-yellow-300 dark:to-red-300" />
    </div>
  );
}
