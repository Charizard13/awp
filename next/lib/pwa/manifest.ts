import type { App } from "@/types";
import { supabaseWebClient } from "@/lib/supabase/client";
import { MetadataRoute } from "next";
import { appAssets } from "../consts";

export function generateManifest(app: App, fileExtension: string) {
  const icons = getIcons(app.id, fileExtension);
  const shortName = getShortName(app.name);
  const screenshots = getScreenshots(app.id, fileExtension);
  const manifest: MetadataRoute.Manifest = {
    name: app.name,
    short_name: shortName,
    icons: icons,
    start_url: process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000/" : app.url,
    id: "/",
    display: "standalone",
    screenshots: screenshots,
    description: app.description ?? undefined,
  };

  const jsonString = JSON.stringify(manifest);

  const blob = new Blob([jsonString], { type: "application/json" });

  return blob;
}

function getShortName(name: string) {
  const words = name.split(" ");
  let shortName = "";
  for (let i = 0; i < words.length; i++) {
    if (shortName.length + words[i].length + 1 <= 12) {
      shortName += words[i] + " ";
    } else {
      break;
    }
  }
  return shortName.trim();
}

const iconSizes = [192, 384, 512, 1024];

function getIcons(appId: string, fileExtension: string) {
  const icons: MetadataRoute.Manifest["icons"] = iconSizes.map((size) => ({
    src: getIconUrl(appId, size),
    sizes: `${size}x${size}`,
    type: fileExtension,
  }));

  return icons;
}

function getIconUrl(appId: string, size: number) {
  const path = `${appId}/${appAssets.icon}`;
  const { data } = supabaseWebClient.storage.from("apps").getPublicUrl(path, {
    transform: {
      width: size,
      height: size,
    },
  });

  return data.publicUrl;
}

const screenshotsSizes = [1280, 540];
function getScreenshots(appId: string, fileExtension: string) {
  const screenshots: MetadataRoute.Manifest["screenshots"] = screenshotsSizes.map((size) => ({
    src: getIconUrl(appId, size),
    sizes: `${size}x${size}`,
    type: fileExtension,
    form_factor: size === 1280 ? "wide" : "narrow",
  }));

  return screenshots;
}
