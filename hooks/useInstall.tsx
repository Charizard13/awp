"use client";
import { useEffect, useState } from "react";

export type App = {
  platform: AppPlatform;
  url?: string;
  id?: string;
};

type AppPlatform = "chrome_web_store" | "play" | "chromeos_play" | "webapp" | "windows" | "f-droid" | "amazon";

type UserChoice = {
  outcome: "accepted" | "dismissed";
};

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<UserChoice>;
} & Event;

export default function useInstall() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [status, setStatus] = useState<"unSupported" | "idle" | "installing" | "installed">("unSupported");

  useEffect(() => {
    const handler = (e: Event) => {
      setPrompt(e as BeforeInstallPromptEvent);
      setStatus("idle");
    };
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
      try {
        const relatedApps = await navigator.getInstalledRelatedApps();
        console.log(relatedApps);
        const pwaApp = relatedApps.find((app) => app.platform === "webapp");
        if (pwaApp) {
          setStatus("installed");
        }
      } catch (e) {
        setStatus("unSupported");
      }
    };
    handler();
  }, []);

  const openInstallDialog = async () => {
    try {
      if (!prompt) {
        setStatus("unSupported");
        return;
      }
      prompt.prompt();
      const result = await prompt.userChoice;
      if (result.outcome === "accepted") {
        setPrompt(null);
        setStatus("installing");
      }
    } catch (e) {
      setStatus("unSupported");
    }
  };

  return { openInstallDialog, status };
}
