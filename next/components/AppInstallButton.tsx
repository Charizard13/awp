"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
export default function AppInstallButton() {
  return (
    <Button is="install-button">
      Install
      <Download className="ml-2" size="1.25em" />
    </Button>
  );
}
