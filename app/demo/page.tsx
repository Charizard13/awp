"use client";
import { Button } from "@/components/ui/button";
import usePwa from "@/hooks/usePwa";

export default function Pwa() {
  const { prompt, install, isInstallable, isInstalled } = usePwa();

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
            <h2 className="text-xl font-semibold">Steps to download app using Chrome:</h2>
            <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 space-y-8">
              <li>
                <Button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600" onClick={() => navigator.clipboard.writeText(window.location.href)}>
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
