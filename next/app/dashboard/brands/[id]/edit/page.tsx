"use client";

import { getBrandAssetsUrls } from "@/lib/url";
import { createWebClient } from "@/lib/supabase/client";

import { useQuery } from "@tanstack/react-query";
import EditForm from "./_components/EditForm";
import { useEffect, useState } from "react";
import Preview from "@/components/preview";
import { useSearchParams } from "next/navigation";
import LinksForm from "./_components/LinksForm";
import { Tables } from "@/types";

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

  const [nextBrand, setNextBrand] = useState(brand);
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "profile";

  if (isLoading || !nextBrand) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center space-y-4">
      {section === "links" && (
        <LinksForm
          links={nextBrand.links}
          setNextBrand={setNextBrand}
          brandId={nextBrand.id}
        />
      )}
      {section === "profile" && (
        <EditForm brand={nextBrand} setNextBrand={setNextBrand} />
      )}
      <Preview brand={nextBrand} isPreviewMode={false} />
    </div>
  );
}
