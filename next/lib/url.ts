import { supabaseWebClient } from "@/lib/supabase/client";

export function getDefaultUrl (queryParam?: string)  {
  let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000"
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  if (!queryParam) {
    return url
  }

  // add potential query params
  url = `${url}${queryParam}`

  return url

}

export function getBrandAssetsUrls(brandId: string) {
  const iconUrl = supabaseWebClient.storage
    .from("brands")
    .getPublicUrl(`${brandId}/logo`);

  return {
    logoUrl: iconUrl.data.publicUrl,
  };
}
