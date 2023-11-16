import { ClipboardIcon, HomeIcon, PaletteIcon, SendToBackIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-600">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-6 space-y-1">
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="/dashboard">
                <HomeIcon />
                <span className="ml-2 text-sm">Home</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="/dashboard/manifest">
                <ClipboardIcon />
                <span className="ml-2 text-sm">Manifest</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <SendToBackIcon />
                <span className="ml-2 text-sm">Service Workers</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <PaletteIcon />
                <span className="ml-2 text-sm">Design</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center px-5 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500" href="#">
                <SettingsIcon />
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
