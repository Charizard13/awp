"use client";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
} & Event;

declare global {
  interface Navigator {
    getInstalledRelatedApps(): Promise<[]>;
  }
}

export default function usePwa() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const currentBrowser = navigator.userAgent.toLowerCase();
    setIsInstallable(currentBrowser.indexOf("edg") > -1 || currentBrowser.indexOf("chrome") > -1);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  useEffect(() => {
    const handler = async () => setIsInstalled(true);
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  useEffect(() => {
    const handler = async () => {
      const relatedApps = await navigator.getInstalledRelatedApps();
      console.log(relatedApps);
      const PWAisInstalled = relatedApps.length > 0;
      setIsInstalled(PWAisInstalled);
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
    }
  };

  return { prompt, install, isInstalled, isInstallable };
}
