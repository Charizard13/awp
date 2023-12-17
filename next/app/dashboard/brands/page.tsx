import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { getAppAssetsUrls } from "@/lib/url";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import BrandCard from "./_components/Card";

const getBrands = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: brandError, data: brands } = await supabase
    .from("brands")
    .select();

  if (brandError) {
    return redirect(
      "/dashboard?message=There was an error getting your brand metadata.",
    );
  }

  const output = brands.map((brand) => {
    const { iconUrl, manifestUrl, scriptUrl } = getAppAssetsUrls(brand.id);
    return {
      ...brand,
      iconUrl,
      manifestUrl,
      scriptUrl,
    };
  });

  return output;
};

export default async function BrandsPage() {
  const brands = await getBrands();

  if (brands.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <p>You don&apos;t have any brands yet.</p>
        <Button asChild>
          <Link href="/dashboard/brands/create">Create Brand</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
