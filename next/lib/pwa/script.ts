import { promises as fs } from "fs";

export async function generateScript() {
  const readInstallButton = fs.readFile(process.cwd() + "/components/web-complied/InstallButton.js", "utf8");
  const readInstallBanner = fs.readFile(process.cwd() + "/components/web-complied/InstallBanner.js", "utf8");
  const readAddToHomeScreen = fs.readFile(process.cwd() + "/components/web-complied/AddToHomeScreen.js", "utf8");

  const readAddToDock = fs.readFile(process.cwd() + "/components/web-complied/AddToDock.js", "utf8");

  const [installButton, installBanner, addToHomeScreen, addToDock] = await Promise.all([readInstallButton, readInstallBanner, readAddToHomeScreen, readAddToDock]);

  const blob = new Blob([installButton, installBanner, addToHomeScreen, addToDock], {
    type: "text/javascript",
  });

  return blob;
}
