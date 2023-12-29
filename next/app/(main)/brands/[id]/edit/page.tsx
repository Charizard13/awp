"use client";
import { TablesUpdate } from "@/types";

import { getBrandAssetsUrls } from "@/lib/url";
import { createWebClient } from "@/lib/supabase/client";

import { useQuery } from "@tanstack/react-query";
import ProfileForm from "./_components/profile/ProfileForm";
import { useEffect, useState } from "react";
import Preview from "@/components/preview";
import { useSearchParams } from "next/navigation";
import LinksForm from "./_components/LinksForm";
import Loading from "@/app/(main)/loading";

export default function EditAppPage({
  params,
}: {
  params: { message: string; id: string };
}) {
  const { data: brand, isLoading } = useQuery({
    queryKey: ["brand", params.id],
    queryFn: async () => {
      const supabase = createWebClient();
      const { error: appError, data: brand } = await supabase
        .from("brands")
        .select("*, links(*)")
        .eq("id", params.id)
        .single();
      if (appError || !brand) {
        throw new Error("Could not find your app");
      }
      const { logoUrl } = getBrandAssetsUrls(brand.id);
      const brandData = {
        ...brand,
        logoUrl,
      };
      return brandData;
    },
    throwOnError: true,
  });

  const [nextBrand, setNextBrand] = useState<
    | (TablesUpdate<"brands"> & {
        logoUrl: string;
        links: TablesUpdate<"links">[];
      })
    | undefined
  >(brand);
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "profile";

  useEffect(() => {
    setNextBrand(brand);
  }, [brand]);

  if (isLoading || !nextBrand || !brand) {
    return <Loading />;
  }

  return (
    <div className="flex flex-grow flex-col justify-evenly gap-4 p-4 lg:flex-row">
      {section === "profile" && (
        <ProfileForm
          brand={brand}
          setNextBrand={setNextBrand}
          brandId={brand.id}
        />
      )}
      {section === "links" && (
        <LinksForm
          links={nextBrand.links}
          setNextBrand={setNextBrand}
          brandId={brand.id}
        />
      )}
      <Preview brand={nextBrand} isPreviewMode={true} />
    </div>
  );
}
