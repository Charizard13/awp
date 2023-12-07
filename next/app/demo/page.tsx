"use client";
import { Button } from "@/components/ui/button";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
// import { InstallBanner } from "@/components/web/InstallBanner";
// import { AddToHomeScreen } from "@/components/web/AddTohomeScreen";
// import { AddToDock } from "@/components/web/AddToDock";
// import { InstallButton } from "@/components/web/InstallButton";

type App = {
  platform: AppPlatform;
  url?: string;
  id?: string;
};

type AppPlatform =
  | "chrome_web_store"
  | "play"
  | "chromeos_play"
  | "webapp"
  | "windows"
  | "f-droid"
  | "amazon";

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
      "install-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "install-banner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "add-to-home-screen": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "add-to-dock": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function DemoPage() {
  const { openNotificationsDialog } = useNotifications();
  useEffect(() => {
    // const installButton = new InstallButton();
    // const installBanner = new InstallBanner();
    // const addToHomeScreen = new AddToHomeScreen();
    // const addToDock = new AddToDock();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Explore the features and capabilities of our Progressive Web App (PWA).
      </p>
      <install-button>Install</install-button>
      <Button onClick={openNotificationsDialog}>
        Open Notifications Dialog
      </Button>
    </div>
  );
}
