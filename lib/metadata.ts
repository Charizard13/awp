import { App } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { MetadataRoute } from "next";

export function generateManifest(app: App, fileExtension: string) {
  const icons = getIconMeta(app.icon, fileExtension);
  const manifest: MetadataRoute.Manifest = {
    name: app.name,
    short_name: app.name,
    description: app.description ?? "",
    icons: icons,
  };
  const jsonString = JSON.stringify(manifest);

  const blob = new Blob([jsonString], { type: "application/json" });

  return blob;
}

function getIconMeta(iconPath: string, fileExtension: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from("app_icon").getPublicUrl(iconPath);
  const icons: MetadataRoute.Manifest["icons"] = [
    {
      src: data.publicUrl,
      sizes: "1024x1024",
      type: fileExtension,
    },
    {
      src: data.publicUrl,
      sizes: "512x512",
      type: fileExtension,
    },
    {
      src: data.publicUrl,
      sizes: "384x384",
      type: fileExtension,
    },
    {
      src: data.publicUrl,
      sizes: "192x192",
      type: fileExtension,
    },
    {
      src: data.publicUrl,
      sizes: "192x192",
      type: fileExtension,
      purpose: "maskable",
    },
  ];
  return icons;
}
