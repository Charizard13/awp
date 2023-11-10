import AuthButton from "../AuthButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 h-16 shadow-md">
      <div className="flex items-center">
        <svg
          className=" h-6 w-6 text-gray-700 dark:text-gray-200"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
        <h1 className="ml-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Awp</h1>
      </div>
      <AuthButton />
    </header>
  );
}
