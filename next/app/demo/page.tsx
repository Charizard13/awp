"use client";
import { Button } from "@/components/ui/button";
// import useNotifications from "@/hooks/useNotifications";
import { DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
// import { runBanner } from "@/components/web/InstallBanner";
import { AddToHomeScreen } from "@/components/web/AddTohomeScreen";
import { AddToDock } from "@/components/web/AddToDock";
import { InstallButton } from "@/components/web/InstallButton";

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
        InstallButtonAttributes,
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

interface InstallButtonAttributes extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export default function DemoPage() {
  // const { openNotificationsDialog } = useNotifications();
  useEffect(() => {
    const installButton = new InstallButton();
    // const addToDock = new AddToDock();
    // const addToHomeScreen = new AddToHomeScreen();
    // const installBanner = new InstallBanner();
    // document.body.appendChild(installBanner);
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-8 p-4 text-center">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Explore the features and capabilities of our Progressive Web App (PWA).
      </p>
      <install-button>
        <Button>
          Install App
          <DownloadIcon className="ml-2 h-4 w-4" />
        </Button>
      </install-button>
      <install-button className="bg-blue-500 hover:bg-blue-600">
        Install App
      </install-button>

      {/* <add-to-dock></add-to-dock> */}
      {/* <Button onClick={openNotificationsDialog}>Open Notifications Dialog</Button> */}
    </div>
  );
}
