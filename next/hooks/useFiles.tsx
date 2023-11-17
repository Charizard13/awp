"use client";
import { toast } from "@/components/ui/use-toast";

async function selectFile() {
  if (!window.showOpenFilePicker) {
    toast({
      title: "Error",
      description: "Your browser does not support this feature.",
    });
    return;
  }
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  return file;
}

export default function useFiles() {
  return { selectFile };
}
