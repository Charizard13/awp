"use client";
import { useEffect, useState } from "react";

type UserChoice = {
  outcome: "accepted" | "dismissed";
};

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<UserChoice>;
} & Event;

type AppPlatform = "chrome_web_store" | "play" | "chromeos_play" | "webapp" | "windows" | "f-droid" | "amazon";

type App = {
  platform: AppPlatform;
  url?: string;
  id?: string;
};

declare global {
  interface Navigator {
    getInstalledRelatedApps(): Promise<App[]>;
  }
}
const currentBrowser = navigator.userAgent.toLowerCase();
const isInstallable = currentBrowser.indexOf("edg") > -1 || currentBrowser.indexOf("chrome") > -1 || currentBrowser.indexOf("safari") > -1;

export default function usePwa() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [status, setStatus] = useState<"unSupported" | "idle" | "installing" | "installed">(isInstallable ? "idle" : "unSupported");

  useEffect(() => {
    const handler = (e: Event) => setPrompt(e as BeforeInstallPromptEvent);
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const handler = () => setStatus("installed");
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("appinstalled", handler);
  }, []);

  useEffect(() => {
    const handler = async () => {
      const relatedApps = await navigator.getInstalledRelatedApps();
      console.log(relatedApps);
      const pwaApp = relatedApps.find((app) => app.platform === "webapp");
      if (pwaApp) {
        setStatus("installed");
      }
    };
    handler();
  }, []);

  const install = async () => {
    if (!prompt) {
      return;
    }
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") {
      setPrompt(null);
      setStatus("installing");
    }
  };

  return { install, status };
}
