"use client";
import type { App } from "@/hooks/useInstall";
import Install from "./_components/Install";
import { Button } from "@/components/ui/button";
// import useServiceWorker from "@/hooks/useServiceWorker";
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
  // const { isRegistered, unRegister, register } = useServiceWorker();
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Explore the features and capabilities of our Progressive Web App (PWA).</p>
      <Install />
      {/* <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
        <Button onClick={register}>Register Service Worker</Button>
        <Button onClick={unRegister} variant="outline">
          Unregister Service Worker
        </Button>
        <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
          {isRegistered ? (
            <p className="text-lg text-gray-600 dark:text-gray-400">Service Worker is registered</p>
          ) : (
            <p className="text-lg text-gray-600 dark:text-gray-400">Service Worker is not registered</p>
          )}
        </div>
      </div> */}
    </div>
  );
}
