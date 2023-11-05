"use client";
import usePwa from "@/hooks/usePwa";

export default function Pwa() {
  const { prompt, install, isInstallable, isInstalled } = usePwa();

  return (
    <div className="fixed top-0 left-0 flex flex-col gap-2 p-4">
      {prompt && (
        <button className="bg-foreground text-background p-2 rounded" onClick={install}>
          Install App
        </button>
      )}
      {isInstalled && <p className="text-foreground">App installed</p>}
      {!isInstallable && (
        <div className="text-foreground">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <div>
              <div className="font-semibold">App Install Not Supported</div>
              <div>Please open this site in Chrome to download the our app.</div>
            </div>
          </div>
          <ol className="list-decimal list-inside">
            <li className="mb-2">
              <a href="https://www.google.com/chrome/" className="text-foreground underline" target="_blank" rel="noopener noreferrer">
                Go to Chrome Download
              </a>
            </li>
            <li className="mb-2">
              <button className="bg-foreground text-background p-1 rounded" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                Copy app link
              </button>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
