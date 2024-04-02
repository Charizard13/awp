"use client";

import { getBrandAssetsUrls } from "@/lib/url";
import { createWebClient } from "@/lib/supabase/client";

import { useQuery } from "@tanstack/react-query";
import ProfileForm from "./_components/ProfileForm";
import { useEffect, useState } from "react";
import Preview from "@/components/preview";
import { useSearchParams } from "next/navigation";
import LinksForm from "./_components/LinksForm";
import Loading from "@/app/loading";

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
      return {
        ...brand,
        logoUrl,
      };
    },
    throwOnError: true,
  });

  const [nextBrand, setNextBrand] = useState(brand);
  const searchParams = useSearchParams();
  const section = searchParams.get("section") ?? "profile";

  useEffect(() => {
    setNextBrand(brand);
  }, [brand]);

  if (isLoading || !nextBrand) {
    return <Loading />;
  }

  return (
    <div
      className="flex flex-1 flex-col justify-evenly gap-4 p-4 lg:flex-row"
      style={{
        maxHeight: "calc(100vh - 4rem)",
      }}
    >
      {section === "profile" && (
        <ProfileForm brand={nextBrand} setNextBrand={setNextBrand} />
      )}
      {section === "links" && (
        <LinksForm
          links={nextBrand.links}
          setNextBrand={setNextBrand}
          brandId={nextBrand.id}
        />
      )}
      <Preview brand={nextBrand} isPreviewMode={true} />
    </div>
  );
}
