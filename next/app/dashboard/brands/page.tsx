import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { getBrandAssetsUrls } from "@/lib/url";
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
    const { logoUrl } = getBrandAssetsUrls(brand.id);
    return {
      ...brand,
      logoUrl,
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
    <div className="m-auto grid max-w-screen-sm grid-cols-1 flex-wrap gap-4 p-4">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
