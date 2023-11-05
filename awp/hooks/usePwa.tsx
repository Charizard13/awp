"use client";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
} & Event;

export default function usePwa() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
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

  return { prompt, install };
}
