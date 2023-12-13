"use client";

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
  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-8 p-4 text-center">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Explore the features and capabilities of our Progressive Web App (PWA).
      </p>

      <install-button className="bg-blue-500 hover:bg-blue-600">
        Install App
      </install-button>
    </div>
  );
}
