"use client";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import AddToDockDialog from "@/app/demo/_components/AddToDockDialog";
import AddToHomeScreenDialog from "@/app/demo/_components/AddToHomeScreen";

export type App = {
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

type UserChoice = {
  outcome: "accepted" | "dismissed";
};

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<UserChoice>;
} & Event;

export default function useInstall() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [status, setStatus] = useState<
    "unSupported" | "idle" | "installing" | "installed"
  >("idle");
  const [userSystem, setUserSystem] = useState<
    "macSafari" | "iosSafari" | "firefoxNotAndroid" | "other"
  >("other");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (
      userAgent.includes("Mac") &&
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome")
    ) {
      setUserSystem("macSafari");
      setStatus("unSupported");
    } else if (
      userAgent.includes("iPhone") &&
      userAgent.includes("Safari") &&
      !userAgent.includes("Chrome")
    ) {
      setUserSystem("iosSafari");
      setStatus("unSupported");
    } else if (
      userAgent.includes("Firefox") &&
      !userAgent.includes("Android")
    ) {
      setUserSystem("firefoxNotAndroid");
      setStatus("unSupported");
    }
  }, []);

  // useEffect(() => {
  //   const handler = (e: Event) => {
  //     setPrompt(e as BeforeInstallPromptEvent);
  //     setStatus("idle");
  //   };
  //   window.addEventListener("beforeinstallprompt", handler);
  //   return () => window.removeEventListener("beforeinstallprompt", handler);
  // }, []);

  // useEffect(() => {
  //   const handler = () => setStatus("installed");
  //   window.addEventListener("appinstalled", handler);
  //   return () => window.removeEventListener("appinstalled", handler);
  // }, []);

  // useEffect(() => {
  //   const isInstalled =
  //     window.navigator.standalone == true || // iOS PWA Standalone
  //     document.referrer.includes("android-app://") || // Android Trusted Web App
  //     ["fullscreen", "standalone", "minimal-ui", "window-controls-overlay"].some((displayMode) => window.matchMedia(`(display-mode: ${displayMode})`).matches); // Chrome PWA (supporting fullscreen, standalone, minimal-ui)
  //   if (!isInstalled) {
  //     return;
  //   }
  //   setStatus("installed");
  // }, []);

  // useEffect(() => {
  //   const handler = async () => {
  //     try {
  //       if (!navigator.getInstalledRelatedApps) {
  //         return;
  //       }
  //       const relatedApps = await navigator.getInstalledRelatedApps();
  //       const pwaApp = relatedApps.find(({ platform }) => platform === "webapp");
  //       if (pwaApp) {
  //         setStatus("installed");
  //       }
  //     } catch (e) {
  //       // ignore
  //     }
  //   };
  //   handler();
  // }, []);

  const handleUnSupported = () => {
    switch (userSystem) {
      case "macSafari":
        toast({
          description: <AddToDockDialog />,
        });
        break;
      case "iosSafari":
        toast({
          description: <AddToHomeScreenDialog />,
        });
        break;
      case "firefoxNotAndroid":
        toast({
          title: "Firefox on Desktop is not supported",
          description:
            "To install the app open this website in Chrome or Safari to install the app",
          action: (
            <ToastAction
              onClick={() => window.open("https://www.google.com/chrome/")}
              altText="Get Chrome"
            >
              Get Chrome
            </ToastAction>
          ),
        });
        break;
    }
  };

  const openInstallDialog = async () => {
    try {
      if (status === "unSupported") {
        handleUnSupported();
        return;
      }
      if (!prompt) {
        toast({
          title: "App install not supported/available",
          description:
            "To install the app open this website in Chrome or Safari to install the app",
        });
        return;
      }
      prompt.prompt();
      const result = await prompt.userChoice;
      if (result.outcome === "accepted") {
        setPrompt(null);
        setStatus("installed");
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  return { openInstallDialog, status };
}
