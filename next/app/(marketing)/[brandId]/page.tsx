import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getAppAssetsUrls } from "@/lib/url";
import AppCard from "./_components/Card";
import type { Metadata, ResolvingMetadata } from "next";
import { createWebClient } from "@/lib/supabase/client";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

type BrandProps = {
  params: {
    brandId: string;
  };
};

// export async function generateMetadata(
//   { params }: BrandProps,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const supabase = createWebClient();

//   const { error: appError, data } = await supabase
//     .from("brands")
//     .select()
//     .eq("name", params.brandId)
//     .single();

//   if (appError || !data) {
//     console.log(appError);
//     throw new Error("Could not find your app");
//   }

//   const { iconUrl } = getAppAssetsUrls(data.id);

//   const app = {
//     ...data,
//     iconUrl,
//   };

//   const keywords = app.description.split(" ");
//   return {
//     title: app.name,
//     description: app.description,
//     keywords: keywords,
//     icons: iconUrl,
//     // openGraph: {
//     //   title: app.name,
//     //   description: app.description,
//     //   images: [
//     //     {
//     //       url: iconUrl,
//     //       width: 800,
//     //       height: 600,
//     //       alt: app.name,
//     //     },
//     //   ],
//     // },
//   };
// }

export default async function EditAppPage({ params }: BrandProps) {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  console.log(params);

  const { error: appError, data } = await supabase
    .from("brands")
    .select()
    .eq("name", params.brandId)
    .single();

  if (appError || !data) {
    throw new Error("Could not find your app");
  }

  const { iconUrl } = getAppAssetsUrls(data.id);

  const app = {
    ...data,
    iconUrl,
  };

  return (
    <div className="flex h-screen justify-center p-8">
      <AppCard key={app.id} app={app} />
    </div>
  );
}
