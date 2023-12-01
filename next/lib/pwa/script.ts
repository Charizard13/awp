import { promises as fs } from "fs";

export async function generateScript() {
  const installButton = await fs.readFile(process.cwd() + "/components/web-complied/InstallButton.js", "utf8");
  const installBanner = await fs.readFile(process.cwd() + "/components/web-complied/InstallBanner.js", "utf8");

  const blob = new Blob([installButton, installBanner], { type: "text/javascript" });

  return blob;
}
