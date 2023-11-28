import fs from "fs";

export function generateScript() {
  const jsCode = fs.readFileSync("./components/web-compiled/InstallButton.js", "utf8");

  const blob = new Blob([jsCode], { type: "text/javascript" });

  return blob;
}
