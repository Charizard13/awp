"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect } from "react";
import { InstallButton } from "@/components/InstallButton";
export default function AppInstallButton() {
  useEffect(() => {
    const installButton = new InstallButton();
  }, []);

  return (
    <install-button hidden>
      <Button>
        Install
        <Download className="ml-2" size="1.25em" />
      </Button>
    </install-button>
  );
}
