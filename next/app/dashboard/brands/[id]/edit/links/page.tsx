"use client";

import { getAppAssetsUrls } from "@/lib/url";
import { createWebClient } from "@/lib/supabase/client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Preview from "@/components/preview";
import LinkButton from "./_components/LinkButton";
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
        .select()
        .eq("id", params.id)
        .single();
      if (appError || !brand) {
        throw new Error("Could not find your app");
      }
      const { iconUrl } = getAppAssetsUrls(brand.id);
      const brandData = {
        ...brand,
        iconUrl,
      };
      return brandData;
    },
    throwOnError: true,
  });

  const [nextBrand, setNextBrand] = useState(brand);

  useEffect(() => {
    if (isLoading) return;
    setNextBrand(brand);
  }, [brand, isLoading]);

  if (isLoading || !nextBrand) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center space-y-4">
      <LinkButton />
      <Preview brand={nextBrand} />
    </div>
  );
}
