import { InstallButton } from "@/components/web/InstallButton";
export function generateScript() {
  const jsonString = JSON.stringify(InstallButton);

  const blob = new Blob([jsonString], { type: "application/javascript" });

  return blob;
}
