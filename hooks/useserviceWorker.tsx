"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
export default function useServiceWorker() {
  const [isRegistered, setIsRegistered] = useState(false);

  const register = async () => {
    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js");
        setIsRegistered(true);
      }
    } catch (e) {
      toast({
        title: "Error",
        description: `Service worker registration failed. ${e}`,
      });
      setIsRegistered(false);
    }
  };

  const unRegister = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach((registration) => registration.unregister());
    setIsRegistered(false);
  };

  return { isRegistered, unRegister, register };
}
