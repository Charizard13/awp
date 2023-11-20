"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AppInstallButton() {
  return (
    <Button id="awp-install-button">
      Install App <Download className="ml-2" />
    </Button>
  );
}
