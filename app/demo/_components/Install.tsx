"use client";
import { Button } from "@/components/ui/button";

import useInstall from "@/hooks/useInstall";

export default function Install() {
  const { openInstallDialog, status } = useInstall();

  switch (status) {
    case "idle":
    case "unSupported":
      return (
        <Button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 " variant="default" onClick={openInstallDialog}>
          Install App <span className="material-symbols-outlined">get_app</span>
        </Button>
      );

    case "installing":
      return (
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Your app is installing...</p>
        </div>
      );

    case "installed":
      return (
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Your app is installed!</p>
        </div>
      );
  }
}
