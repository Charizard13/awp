import type { App } from "@/types";
import { supabaseWebClient } from "@/lib/supabase/client";
import { MetadataRoute } from "next";
import { appAssets } from "../consts";

export function generateManifest(app: App, fileExtension: string) {
  const icons = getIcons(app.id, fileExtension);
  const shortName = getShortName(app.name);
  const manifest: MetadataRoute.Manifest = {
    name: app.name,
    short_name: shortName,
    icons: icons,
    start_url: app.url,
    id: "/",
    display: "standalone",
    description: app.description ?? undefined,
    // protocol_handlers: getProtocols(),
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

const sizes = [192, 384, 512, 1024];

function getIcons(appId: string, fileExtension: string) {
  const icons: MetadataRoute.Manifest["icons"] = sizes.map((size) => ({
    src: getIconUrl(appId, size),
    sizes: `${size}x${size}`,
    type: fileExtension,
  }));

  // icons.push({
  //   src: getIconUrl(iconPath, 512),
  //   sizes: `${512}x${512}`,
  //   type: fileExtension,
  //   purpose: "maskable",
  // });

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

// function getProtocols() {
//   return [
//     {
//       protocol: "web+pwa",
//       url: `${getSiteUrl()}?pwaprotocolredirect=%s`,
//     },
//   ];
// }
