"use client";
import type { App } from "@/hooks/useInstall";
import Install from "./_components/Install";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";

declare global {
  interface Window {
    showOpenFilePicker?(): Promise<any>;
  }
  interface Navigator {
    getInstalledRelatedApps?(): Promise<App[]>;
    standalone?: boolean;
  }
}

export default function DemoPage() {
  const { openNotificationsDialog } = useNotifications();

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Explore the features and capabilities of our Progressive Web App (PWA).</p>
      <Install />
      <Button onClick={openNotificationsDialog}>Open Notifications Dialog</Button>
    </div>
  );
}
