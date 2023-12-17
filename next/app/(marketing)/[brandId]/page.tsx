import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getAppAssetsUrls } from "@/lib/url";
import Preview from "@/components/preview";
import { Metadata, ResolvingMetadata } from "next/types";

type BrandProps = {
  params: {
    brandId: string;
  };
};

export async function generateMetadata(
  { params }: BrandProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: brand } = await supabase
    .from("brands")
    .select()
    .eq("name", params.brandId)
    .single();

  if (appError || !brand) {
    console.log(appError);
    throw new Error("Could not find your app");
  }

  const { iconUrl } = getAppAssetsUrls(brand.id);

  const { name } = brand;
  const description = brand.description ?? undefined;
  const keywords = description?.split(" ");
  return {
    title: name,
    description: description,
    keywords: keywords,
    icons: iconUrl,
    openGraph: {
      title: name,
      description: description,
      images: [
        {
          url: iconUrl,
          width: 800,
          height: 600,
          alt: name,
        },
      ],
    },
  };
}

export default async function EditAppPage({ params }: BrandProps) {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: brand } = await supabase
    .from("brands")
    .select()
    .eq("name", params.brandId)
    .single();

  if (appError || !brand) {
    throw new Error("Could not find your app");
  }

  const { iconUrl } = getAppAssetsUrls(brand.id);

  const app = {
    ...brand,
    iconUrl,
  };

  return (
    <div className="flex h-screen justify-center p-8">
      <Preview brand={app} isPreviewMode={false} />
    </div>
  );
}
