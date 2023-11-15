import Link from "next/link";

export default function SideBar() {
  return (
    <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-600">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-6 space-y-1">
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="/dashboard">
                <svg
                  className=" w-5 h-5"
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
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="ml-2 text-sm">Home</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="/dashboard/manifest">
                <svg
                  className=" w-5 h-5"
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
                  <rect height="4" rx="1" ry="1" width="8" x="8" y="2" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                </svg>
                <span className="ml-2 text-sm">Manifest</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <svg
                  className=" w-5 h-5"
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
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m8 17 4 4 4-4" />
                </svg>
                <span className="ml-2 text-sm">Service Workers</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <svg
                  className=" w-5 h-5"
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
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
                <span className="ml-2 text-sm">Design</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <svg
                  className=" w-5 h-5"
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
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="ml-2 text-sm">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full" />
    </div>
  );
}
