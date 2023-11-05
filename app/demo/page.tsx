"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import usePwa from "@/hooks/usePwa";

export default function Pwa() {
  const { prompt, install, isInstallable, isInstalled } = usePwa();
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard",
      description: "Use the copied URL to install the app on your device/computer",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center p-4 space-y-8">
      <h1 className="text-3xl font-bold">Awp Demo Page</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">Explore the features and capabilities of our Progressive Web App (PWA).</p>
      {prompt && (
        <Button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" variant="default" onClick={install}>
          Install App
        </Button>
      )}
      {isInstalled && (
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">Your app is installed!</p>
        </div>
      )}
      {!isInstallable && (
        <div className="text-foreground">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold items-center flex space-x-2">
              <span className="material-symbols-outlined text-red-500">warning</span> Your browser is not supported
            </h2>
            <h3 className="text-mdfont-semibold items-center flex space-x-2">Follow the steps below to install the app on your device/computer</h3>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-8">
              <li>
                <Button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={handleCopy}>
                  Copy the URL of this page
                  <span className="material-symbols-outlined">content_copy</span>
                </Button>
              </li>
              <li className="mb-2">
                <a href="https://www.google.com/chrome/" className="text-foreground underline" target="_blank" rel="noopener noreferrer">
                  Go to official Chrome website download page
                </a>
              </li>
              <li>Open Google Chrome.</li>
              <li>Paste the URL in the address bar and press Enter.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
