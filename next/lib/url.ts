import { supabaseWebClient } from "@/lib/supabase/client";

export function getDefaultUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://127.0.0.1:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
}

export function getAppAssetsUrls(appId: string) {
  const manifestUrl = supabaseWebClient.storage.from("apps").getPublicUrl(`${appId}/manifest.json`);
  const iconUrl = supabaseWebClient.storage.from("apps").getPublicUrl(`${appId}/icon.png`);
  const script = supabaseWebClient.storage.from("apps").getPublicUrl(`${appId}/script.js`);

  return {
    manifestUrl: manifestUrl.data.publicUrl,
    iconUrl: iconUrl.data.publicUrl,
    scriptUrl: script.data.publicUrl,
  };
}
