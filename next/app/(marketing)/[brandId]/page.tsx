import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getBrandAssetsUrls } from "@/lib/url";
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
  const validBrandName = params.brandId.replace("%20", " ").trim() ?? undefined;
  const { error: appError, data: brand } = await supabase
    .from("brands")
    .select()
    .eq("name", validBrandName)
    .single();

  if (appError || !brand) {
    throw new Error("Could not find your brand");
  }

  const { logoUrl } = getBrandAssetsUrls(brand.id);

  const { name } = brand;
  const description = brand.description ?? undefined;
  const keywords = description?.split(" ");
  return {
    title: name,
    description: description,
    keywords: keywords,
    icons: logoUrl,
    openGraph: {
      title: name,
      description: description,
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: name,
        },
      ],
    },
  };
}

export default async function BrandPage({ params }: BrandProps) {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const validBrandName = params.brandId.replace("%20", " ").trim() ?? undefined;

  const { error: appError, data: brand } = await supabase
    .from("brands")
    .select("*, links(*)")
    .eq("name", validBrandName)
    .single();

  if (appError || !brand) {
    throw new Error("Could not find your app");
  }

  const { logoUrl } = getBrandAssetsUrls(brand.id);
  const brandData = {
    ...brand,
    logoUrl,
  };
  return (
    <div className="flex h-screen justify-center p-8">
      <Preview brand={brandData} isPreviewMode={false} />
    </div>
  );
}
