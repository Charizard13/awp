"use client";
import type { App } from "@/hooks/useInstall";
import Install from "./_components/Install";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { InstallButton } from "@/components/web/InstallButton";
import { InstallBanner } from "@/components/web/InstallBanner";
import { AddToHomeScreen } from "@/components/web/AddTohomeScreen";
import { AddToDock } from "@/components/web/AddToDock";

declare global {
  interface Window {
    showOpenFilePicker?(): Promise<any>;
  }
  interface Navigator {
    getInstalledRelatedApps?(): Promise<App[]>;
    standalone?: boolean;
  }
  namespace JSX {
    interface IntrinsicElements {
      "install-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "install-banner": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function DemoPage() {
  const { openNotificationsDialog } = useNotifications();
  useEffect(() => {
    const installButton = new InstallButton();
    const installBanner = new InstallBanner();
    const addToHomeScreen = new AddToHomeScreen();
    const addToDock = new AddToDock();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Explore the features and capabilities of our Progressive Web App (PWA).</p>
      <Install />
      <Button onClick={openNotificationsDialog}>Open Notifications Dialog</Button>
    </div>
  );
}
